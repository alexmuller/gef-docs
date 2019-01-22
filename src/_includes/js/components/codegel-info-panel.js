/**
 * Info Panel
 * @namespace codegel
 * @method codegel.InfoPanel.init
 */

(function () {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.InfoPanel = {};

  self.init = function () { }

  self.constructor = function (elem, options) {
    // The default settings for the tab interface
    var settings = {
      hAlign: 'left', // or 'center' or 'right'
      vAlign: 'below', // or 'above'
      width: '15rem' // width of the panel
    };

    // Overwrite defaults where they are provided in options
    for (var setting in options) {
      if (options.hasOwnProperty(setting)) {
        settings[setting] = options[setting];
      }
    }

    // Make sure the parent has the right classes
    this.elem = elem;
    this.elem.classList.add(
      'codegel-infopanel',
      'codegel-infopanel-with-js'
    );

    // Save key elements
    this.button = this.elem.querySelector('.codegel-infopanel-button');
    this.panel = this.elem.querySelector('.codegel-infopanel-panel');
    this.closeButton = this.panel.querySelector('.codegel-infopanel-close-button');

    // Add the alignment classes
    this.panel.classList.add(
      'codegel-infopanel-' + settings.hAlign,
      'codegel-infopanel-' + settings.vAlign
    );

    // toggle the open/closed state on button clicks
    this.button.addEventListener('click', function () {
      if (this.panel.hidden) {
        this.open()
      } else {
        this.close();
        this.button.focus();
      }
    }.bind(this));

    // Close the panel on ESC
    this.panel.addEventListener('keydown', function (e) {
      if (e.keyCode === 27) {
        e.preventDefault();
        this.close();
        this.button.focus();
      }
    }.bind(this));

    // Close and return focus via the close button
    this.closeButton.addEventListener('click', function () {
      this.close();
      this.button.focus();
    }.bind(this));

    // Find the last focusable element
    this.focusable = this.panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])');
    this.lastFocusable = this.focusable[this.focusable.length - 1];

    // Close the panel if the user tabs off
    // the last focusable element
    this.lastFocusable.addEventListener('keydown', function (e) {
      if (!e.shiftKey && e.keyCode == 9) {
        this.close();
      }
    }.bind(this));

    // Close the panel if the user clicks outside it
    this.closeOnBlur = function (e) {
      if (!this.panel.contains(e.target) && !this.button.contains(e.target)) {
        this.close();
      }
    }.bind(this);
  }

  // The open method
  self.constructor.prototype.open = function () {
    this.panel.hidden = false;
    this.button.setAttribute('aria-expanded', 'true');
    this.closeButton.focus();
    document.addEventListener('click', this.closeOnBlur);
    // For adding `position: relative` dynamically
    // to avoid z-index issues
    this.elem.classList.add('codegel-infopanel-showing');
  }

  // The close method
  self.constructor.prototype.close = function () {
    this.panel.hidden = true;
    this.button.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', this.closeOnBlur);
    this.elem.classList.remove('codegel-infopanel-showing');
  }
})();