/**
 * Tabs
 * @namespace gef
 * @method gef.Tabs.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Tabs = {};

  self.init = function () { }

  self.constructor = function (elem) {
    var tablist = elem.querySelector('ul');
    var tabs = elem.querySelectorAll('a');
    var panels = elem.querySelectorAll('section[id]');

    tablist.setAttribute('role', 'tablist');

    var tabInfo = function () {
      var focus;
      var tab;
      if (window.location.hash) {
        tab = Array.prototype.indexOf.call(
          tabs,
          document.getElementById('tab-' + window.location.hash.substring(1))
        );
      }
      if (typeof tab === 'undefined' || tab < 0) {
        tab = 0;
        focus = false;
      }
      else {
        focus = true;
      }
      return {
        index: tab,
        focus: focus
      };
    }

    var switchTab = function (oldIndex, tabInfo) {
      if (typeof oldIndex !== 'undefined' && oldIndex > -1) {
        tabs[oldIndex].removeAttribute('aria-selected');
        panels[oldIndex].hidden = true;
      }

      tabs[tabInfo.index].setAttribute('aria-selected', 'true');
      panels[tabInfo.index].hidden = false;

      if (typeof oldIndex !== 'undefined' && tabInfo.focus) {
        panels[tabInfo.index].focus();
      }
    }

    Array.prototype.forEach.call(tabs, function (tab, i) {
      tab.setAttribute('role', 'tab');
      tab.parentNode.setAttribute('role', 'presentation');
      tab.id = 'tab-' + tab.getAttribute('href').substring(1);

      var panel = panels[i];
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.hidden = true;
    });

    window.addEventListener('hashchange', function (e) {
      var selected = tablist.querySelector('[aria-selected]');
      var oldIndex = selected ? Array.prototype.indexOf.call(tabs, selected) : undefined;
      switchTab(oldIndex, tabInfo());
    }, false);

    window.addEventListener('DOMContentLoaded', function () {
      switchTab(undefined, tabInfo());
    });
  }

})();