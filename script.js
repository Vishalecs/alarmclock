let alarmTimeout; // Variable to store the alarm timeout
const alarmSound = new Audio('alarm.mp3'); // Audio element for the alarm sound

function updateTime() {
  const now = new Date(); // Get the current date and time
  const hours = now.getHours().toString().padStart(2, '0'); // Get hours and format as two digits
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Get minutes and format as two digits
  const seconds = now.getSeconds().toString().padStart(2, '0'); // Get seconds and format as two digits
  
  const clock = document.querySelector('.clock'); // Get the clock element
  clock.querySelector('.hours').textContent = hours; // Update hours display
  clock.querySelector('.minutes').textContent = minutes; // Update minutes display
  clock.querySelector('.seconds').textContent = seconds; // Update seconds display
  
  const alarmTime = document.getElementById('alarmTime').value; // Get the value of the alarm input field
  if (alarmTime) {
    const [alarmHours, alarmMinutes] = alarmTime.split(':'); // Split the alarm time into hours and minutes
    const alarm = new Date(); // Create a new date object for the alarm time
    alarm.setHours(alarmHours); // Set the alarm hours
    alarm.setMinutes(alarmMinutes); // Set the alarm minutes
    alarm.setSeconds(0); // Set the alarm seconds to 0
    
    if (now >= alarm) {
      alarmSound.play(); // Play the alarm sound if the current time is equal to or later than the alarm time
      document.getElementById('alarmTime').value = ''; // Clear the alarm input field
    }
    else {
      const timeUntilAlarm = (alarm - now) / 1000; // Calculate the time difference until the alarm in seconds
      const timeUntilAlarmInMinutes = Math.floor(timeUntilAlarm / 60); // Convert time difference to minutes
      const timeUntilAlarmInSeconds = Math.floor(timeUntilAlarm % 60); // Get the remaining seconds
      const timeUntilAlarmString = timeUntilAlarmInMinutes.toString().padStart(2, '0') + ':' + timeUntilAlarmInSeconds.toString().padStart(2, '0'); // Format the time difference as MM:SS
      document.getElementById('timeUntilAlarm').textContent = timeUntilAlarmString; // Display the time until the alarm
      
      if (!alarmTimeout) {
        alarmTimeout = setTimeout(() => {
          alarmSound.play(); // Play the alarm sound
          document.getElementById('alarmTime').value = ''; // Clear the alarm input field
          document.getElementById('timeUntilAlarm').textContent = ''; // Clear the time until the alarm display
          alarmTimeout = null; // Reset the alarm timeout
        }, timeUntilAlarm * 1000); // Set the alarm timeout based on the time difference until the alarm
      }
    }
  }
}

function clearAlarm() {
  clearTimeout(alarmTimeout); // Clear the alarm timeout
  alarmTimeout = null; // Reset the alarm timeout variable
  document.getElementById('alarmTime').value = ''; // Clear the alarm input field
  document.getElementById('timeUntilAlarm').textContent = ''; // Clear the time until the alarm display
}

// Event listeners for set alarm and clear alarm buttons
document.getElementById('setAlarm').addEventListener('click', updateTime);
document.getElementById('clearAlarm').addEventListener('click', clearAlarm);

// Update the time every second
setInterval(updateTime, 1000);
