import React, { useState } from "react";
import { View, Text, Switch } from "react-native";

const PushNotificationsSetting = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View>
            <Text>Push notifications</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

export default PushNotificationsSetting;
