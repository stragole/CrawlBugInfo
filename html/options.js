// Saves options to chrome.storage.sync.
function save_options() {
  var silence = document.getElementById('silence').checked;
  chrome.storage.local.set({
    silence: silence
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = '设置已保存';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // default
  chrome.storage.local.get({
    silence: false
  }, function(items) {
    document.getElementById('silence').checked = items.silence;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);