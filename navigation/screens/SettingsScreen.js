import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { firebase } from "../../config";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.titleText}>Tilladelser</Text>
            <TouchableOpacity style={styles.cards}>
                <Ionicons name="map-outline" size={42} color="green" />
                <Text style={{ paddingLeft: 13, fontWeight: "bold" }}>
                    Adgang til lokation{"\n"}
                    {"\n"}
                    <Text style={{ paddingTop: 4, fontWeight: "300" }}>
                        Giver adgang til din nuværnde{"\n"}lokation
                    </Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards}>
                <Ionicons name="people-circle-outline" size={42} color="green" />
                <Text style={{ paddingLeft: 13, fontWeight: "bold" }}>
                    Adgang til kontakter {"\n"}
                    {"\n"}
                    <Text style={{ padding: 4, fontWeight: "300" }}>
                        Giver adgang til telefon kontakter
                    </Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cards}>
                <Ionicons name="chatbubbles-outline" size={42} color="green" />
                <Text style={{ paddingLeft: 13, fontWeight: "bold" }}>
                    Adgang til meddeleser{"\n"}
                    {"\n"}
                    <Text style={{ padding: 4, fontWeight: "300" }}>
                        giver adgang til at sende meddeleser {"\n"}til favorit kontakter
                    </Text>
                </Text>
            </TouchableOpacity>

            {/* Log ud funktion */}

            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                <Text style={styles.Text}>log ud</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fffff",
    },
    Text: {
        position: "relative",
        bottom: -150,
        fontSize: 24,
        color: "#ff0000",
        textAlign: "center",
    },
    cards: {
        flexDirection: "row",
        padding: 10,
        margin: 5,
        backgroundColor: "#F2F2F2",
        width: 300,
        height: 100,
        borderRadius: 5,
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
});
