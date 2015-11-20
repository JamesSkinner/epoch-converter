// Saves options to chrome.storage.sync.
function save_options() {
  var dateFormat = document.getElementById('date-format').value;
  chrome.storage.sync.set({
    dateFormat : dateFormat,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
    showExampleDate();
  });
}

function showExampleDate() {
    chrome.storage.sync.get(function(items){
        document.getElementById('date-example').textContent =
            "Example: " + moment().format(items.dateFormat);
    });
}

// Restores state using the preferences stored in chrome.storage.
function restore_options() {
  // Use default value
  chrome.storage.sync.get({
      dateFormat : 'MM/DD/YYYY HH:mm:ss'
  }, function(items) {
      document.getElementById('date-format').value = items.dateFormat;
  });
}

document.addEventListener('DOMContentLoaded', function(){
    restore_options();
    showExampleDate();
});
document.getElementById('save').addEventListener('click',save_options);
