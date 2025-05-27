const address = document.getElementById('address');
const goBtn = document.getElementById('go');
const content = document.getElementById('content');
const tabs = document.getElementById('tabs');
const newTabBtn = document.getElementById('new-tab');

let tabList = [];
let activeTab = null;

function createTab(url = 'https://example.com') {
  const tabId = 'tab-' + Date.now();
  const tabBtn = document.createElement('button');
  tabBtn.textContent = url;
  tabBtn.onclick = () => switchTab(tabId);
  tabs.insertBefore(tabBtn, newTabBtn);

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.id = tabId;
  iframe.style.display = 'none';
  content.appendChild(iframe);

  tabList.push({ id: tabId, btn: tabBtn, iframe });
  switchTab(tabId);
}

function switchTab(tabId) {
  tabList.forEach(tab => {
    tab.iframe.style.display = tab.id === tabId ? '' : 'none';
    tab.btn.style.background = tab.id === tabId ? '#fff' : '#444';
    tab.btn.style.color = tab.id === tabId ? '#000' : '#fff';
  });
  activeTab = tabId;
  const tab = tabList.find(t => t.id === tabId);
  if (tab) address.value = tab.iframe.src;
}

goBtn.onclick = () => {
  const tab = tabList.find(t => t.id === activeTab);
  if (tab) tab.iframe.src = address.value;
};
newTabBtn.onclick = () => createTab();

window.onload = () => createTab();
