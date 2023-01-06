import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    SectionList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";
import * as Location from "expo-location";
import { firebase } from "../../config";

export default function ContactListScreen() {
    const [contacts, setContacts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [name, setName] = useState("");
    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    setName(snapshot.data());
                } else {
                    console.log("User does not exist");
                }
            });
    }, []);
    // Skaffer telefonens kontakter lokalt
    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });
                if (data && data.length > 0) {
                    setContacts(data);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        })();
    }, []);

    const addToFavorites = contact => {
        if (!favorites.some(favorite => favorite.id === contact.id)) {
            setFavorites([...favorites, contact]);
        }
    };

    const searchContacts = term => {
        setSearchTerm(term);
    };

    const renderContact = ({ item, isFavorite }) => {
        const deleteContact = () => {
            setFavorites(favorites.filter(favorite => favorite.id !== item.id));
        };

        const sendSMSWithLocation = async phoneNumber => {
            try {
                // Skaffer brugerens nuværende lokation
                const location = await Location.getCurrentPositionAsync({});

                // Send en sms med lokation og tekst besked
                await SMS.sendSMSAsync(
                    [phoneNumber],
                    `${item.name} prøv at kontakt mig hurtigst muligt jeg er i fare her er min lokation: https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`
                );
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <View style={styles.contactContainer}>
                <TouchableOpacity onPress={() => addToFavorites(item)}>
                    <Text style={styles.contactName}>{item.name}</Text>
                    <Text style={styles.contactPhone}>{item.phoneNumbers[0].number}</Text>
                </TouchableOpacity>
                {isFavorite && (
                    <>
                        <TouchableOpacity onPress={deleteContact}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => sendSMSWithLocation(item.phoneNumbers[0].number)}
                        >
                            <Text style={styles.sendButton}>Send location</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        );
    };

    // Filtrer kontakter med søgefunktion
    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Oplys kontakterken alfabetisk rækkefølge
    const sections = [];
    const sectionTitles = new Set();
    filteredContacts.forEach(contact => {
        const title = contact.name[0].toUpperCase();
        if (!sectionTitles.has(title)) {
            sectionTitles.add(title);
            sections.push({ title, data: [contact] });
        } else {
            sections.find(section => section.title === title).data.push(contact);
        }
    });

    const renderSectionHeader = ({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.profileContainer}>
                    <Ionicons name="ios-person" size={100} color="#15921F" />
                    <Text style={styles.nameText}>{name.firstName}</Text>
                    <Text style={styles.phoneText}>{name.phoneNumber}</Text>
                    <Text style={styles.phoneText}>{name.email}</Text>
                </ScrollView>
            </SafeAreaView>
            <View style={styles.searchContainer}>
                <Ionicons name="ios-search" size={24} />

                <TextInput
                    style={styles.searchInput}
                    placeholder="Søg efter kontakter"
                    onChangeText={searchContacts}
                    value={searchTerm}
                />
            </View>
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

            {filteredContacts.length > 0 ? (
                <SectionList
                    sections={sections}
                    keyExtractor={item => item.id}
                    renderItem={renderContact}
                    renderSectionHeader={renderSectionHeader}
                />
            ) : (
                <Text style={styles.noContactsText}>No contacts found.</Text>
            )}
            {favorites.length > 0 && (
                <FlatList
                    data={favorites}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderContact({ item, isFavorite: true })}
                    style={{ backgroundColor: "#f2f2f2", height: 240, borderTopWidth: 5 }}
                />
            )}
        </View>
    );
}
// Styling af profilscreen
const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        flex: 1,
        backgroundColor: "#fff",
    },
    searchContainer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,

        zIndex: 1,
        padding: 10,
        backgroundColor: "#f1f1f1",
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
    },
    contactContainer: {
        padding: 15,
        borderBottomWidth: 3,
        borderColor: "#eee",
    },
    contactName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    contactPhone: {
        fontSize: 14,
        color: "#666",
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: "bold",
        backgroundColor: "#f1f1f1",
        padding: 8,
    },
    noContactsText: {
        fontSize: 16,
        padding: 8,
        alignSelf: "center",
    },
    deleteButton: {
        color: "red",
    },
    profileContainer: {
        alignItems: "center", // centers horizontally
        justifyContent: "center", // centers vertically
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    phoneText: {
        fontSize: 16,
        color: "grey",
        marginTop: 5,
    },
});
