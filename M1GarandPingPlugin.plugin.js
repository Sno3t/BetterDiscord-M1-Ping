/**
 * @name M1GarandPingPlugin
 * @version 1.0.1
 * @description Replaces every 8th message sound with a custom sound.
 * @author Snoet_
 * @updateUrl https://github.com/Sno3t/BetterDiscord-M1-Ping
 */


module.exports = (() => {
    const config = {
        info: {
            name: "CustomPingSound",
            version: "1.0.0",
            description: "Replaces every 8th message sound with a custom sound."
        }
    };

    class CustomPingSound {
        constructor() { 
            this.messageCount = 0;
        }

        start() {
            BdApi.showToast("CustomPingSound started!", {type: "success"});
            this.attachMessageListener();
        }

        stop() {
            BdApi.showToast("CustomPingSound stopped!", {type: "error"});
            this.detachMessageListener();
        }

        attachMessageListener() {
            this.messageListener = (e) => {
                this.messageCount++;
                if (this.messageCount % 8 === 0) {
                    this.playCustomSound();
                }
            };

            // Attach your listener to the Discord message event
            BdApi.findModuleByProps("dispatch").subscribe("MESSAGE_CREATE", this.messageListener);
        }

        detachMessageListener() {
            BdApi.findModuleByProps("dispatch").unsubscribe("MESSAGE_CREATE", this.messageListener);
        }

        playCustomSound() {
            const audio = new Audio('https://github.com/Sno3t/BetterDiscord-M1-Ping/raw/main/sound/m1_garand_ping.mp3');
            audio.play().catch(e => console.error("Failed to play sound:", e));
        }
    }

    return CustomPingSound;
})();
