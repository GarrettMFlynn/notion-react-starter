import React from "react";

export function MuseReadout() {
    async function onConnectButtonClick(){
      await window.museClient.connect();
      window.museClient.start();
      
      // Subscribe to EEG data
      const leftEyeChannel = window.channelNames.indexOf('AF7');
      console.log(window.museClient.eegReadings)
      window.museClient.eegReadings.subscribe(r => {
        let max;
        if (r.electrode === leftEyeChannel){
          max = Math.max(...r.samples.map(n => Math.abs(n)))
          console.log(max)
          if (max > 500){
            document.getElementById('muse-readout').innerHTML = 'blink'
          } else {
            document.getElementById('muse-readout').innerHTML = 'None'
          }
        }
      })
      // this.leftBlinks = window.museClient.eegReadings
      // .filter(r => r.electrode === leftEyeChannel)
      // .map(r => Math.max(...r.samples.map(n => Math.abs(n))))
      // .filter(max => max > 500)

      // this.leftBlinks.subscribe(value => {
      //   console.log('Blink!', value);
      // });
    }

  return (
    <div id="muse-container">
      <div id="muse-readout">None</div>
      <button id="connect-button" onClick={onConnectButtonClick}>Connect</button>
    </div>
  );
}
