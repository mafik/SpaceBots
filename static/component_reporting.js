
// When component scanning will be done, we will get our answer as
// 'report' message.

socket.on('report', function on_report(obj) {

  // We can save it to our `objects` collection:

  var always_sent = { manipulator_slot: true, parent: true, position: true, velocity: true };
  register_object(obj, always_sent);

  // Now, that we are scanning our object, we could schedule a
  // rescan - just to be safe - to run every 10 seconds.
  setTimeout(function() {
    if(obj.id in objects) {
      socket.emit('report', { target: obj.id });
    }
  }, 10000 * (Math.random() + 1)); // time in ms

  // Now, we could check features of this object and check whether
  // it deserves special attention

  // If it is our avatar, we'll save it in the global `avatar`
  // variable.
  if(obj.id == avatar_id) {
    avatar = obj;
  }

  // If it is a radio, we'll save it into global `radio` variable...
  if(('radio' in obj.features) && (radio === undefined)) {
    radio = obj;
    // ... and schedule a radio scan right away.
    socket.emit('radio scan', { target: radio.id });
  }

  // If this object is capable of hauling mass with high velocities,
  // we'll save it into impulse_drive variable for later use.
  if(('impulse_drive_payload' in obj) && (impulse_drive === undefined)) {
    impulse_drive = obj;
  }

  // We could alse remember our resource and energy stores:
  if(('store_stored' in obj) && (store === undefined)) {
    store = obj;
  }
  if(('battery_energy' in obj) && (battery === undefined)) {
    battery = obj;
  }

  // We can use any object with manipulator_range to manipulate
  // other objects
  if('manipulator_range' in obj) {
    manipulator = obj;
  }

  if('laboratory_tech_level' in obj) {
    laboratory = obj;
  }

  if(obj.features && obj.features.refinery) {
    refinery = obj;
  }

  if(obj.features && obj.features.assembler) {
    assembler = obj;
  }
});
