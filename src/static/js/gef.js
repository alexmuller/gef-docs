/**
 * Accordion
 * @namespace gef
 * @method gef.Accordion.init 
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Accordion = {};

  self.init = function () { }

  self.constructor = function (elem) {
    this.sections = [];
    for (i = 0; i < elem.children.length; i++) {
      var section = {};
      // Save the section element
      section.elem = elem.children[i];

      // Make the first element in the section the 'handle'
      section.handle = section.elem.firstElementChild;
      section.handle.classList.add('gef-accordion__handle');

      if (section.handle.nodeName === 'BUTTON') {
        console.error('The first child of each accordion element must not be a <button>');
        return;
      }

      // Create the handle's button
      var button = document.createElement('button');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('type', 'button');
      button.innerHTML = '<span>' + section.handle.innerHTML + '</span>';
      button.innerHTML += '<svg viewBox="0 0 32 32" class="gel-icon gel-icon--text"><path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>';

      section.handle.innerHTML = '';
      section.handle.appendChild(button);
      section.button = button;

      // Make the contents everything in the section
      // except the handle
      var contents = Array.prototype.slice.call(section.elem.children, 1);
      // Create the drawer into which to place the contents
      section.drawer = document.createElement('div');
      section.drawer.classList.add('gef-accordion__drawer');
      section.drawer.hidden = true;
      // Place the contents in the draw
      contents.forEach(function (node) {
        section.drawer.appendChild(node);
      });
      section.elem.appendChild(section.drawer);

      // Save a reference to the section
      this.sections.push(section);
    }

    // If the URL contains a hash corresponding to a section
    // or child of a section, open the section
    // and focus the fragment
    this.hashHandle = function () {
      var id = window.location.hash.substring(1);
      var target = document.getElementById(id);
      this.sections.forEach(function (section) {
        if (section.elem.contains(target)) {
          this.open(section);
          target.tabIndex = -1;
          target.focus();
        }
      }.bind(this));
    }

    // Handle the hash behaviour
    document.addEventListener('DOMContentLoaded', this.hashHandle());
    window.addEventListener('hashchange', function () {
      this.hashHandle();
    }.bind(this));

    // Listen to clicks on the handle buttons to 
    // toggle the section state between collapsed and expanded
    this.sections.forEach(function (section) {
      section.button.addEventListener('click', function () {
        var expanded = !section.drawer.hidden;
        if (expanded) {
          this.close(section);
        } else {
          this.open(section);
        }
      }.bind(this));
    }.bind(this));
  }

  // The open method
  self.constructor.prototype.open = function (section) {
    section.button.setAttribute('aria-expanded', 'true');
    section.drawer.hidden = false;
  }

  // The close method
  self.constructor.prototype.close = function (section) {
    section.button.setAttribute('aria-expanded', 'false');
    section.drawer.hidden = true;
  }

  // The openAll method
  self.constructor.prototype.openAll = function () {
    this.sections.forEach(function (section) {
      this.open(section);
    }.bind(this));
  }

  // The closeAll method
  self.constructor.prototype.closeAll = function () {
    this.sections.forEach(function (section) {
      this.close(section);
    }.bind(this));
  }
})();/**
 * ActionDialog
 * @namespace gef
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.ActionDialog = {};

  self.init = function () {
    // Inert attribute polyfill
    "inert" in HTMLElement.prototype || (Object.defineProperty(HTMLElement.prototype, "inert", { enumerable: !0, get: function () { return this.hasAttribute("inert") }, set: function (h) { h ? this.setAttribute("inert", "") : this.removeAttribute("inert") } }), window.addEventListener("load", function () {
      function h(a) {
        var b = null; try { b = new KeyboardEvent("keydown", { keyCode: 9, which: 9, key: "Tab", code: "Tab", keyIdentifier: "U+0009", shiftKey: !!a, bubbles: !0 }) } catch (g) {
          try {
            b = document.createEvent("KeyboardEvent"), b.initKeyboardEvent("keydown",
              !0, !0, window, "Tab", 0, a ? "Shift" : "", !1, "en")
          } catch (d) { }
        } if (b) { try { Object.defineProperty(b, "keyCode", { value: 9 }) } catch (g) { } document.dispatchEvent(b) }
      } function k(a) { for (; a && a !== document.documentElement;) { if (a.hasAttribute("inert")) return a; a = a.parentElement } return null } function e(a) { var b = a.path; return b && b[0] || a.target } function l(a) { a.path[a.path.length - 1] !== window && (m(e(a)), a.preventDefault(), a.stopPropagation()) } function m(a) {
        var b = k(a); if (b) {
          if (document.hasFocus() && 0 !== f) {
            var g = (c || document).activeElement;
            h(0 > f ? !0 : !1); if (g != (c || document).activeElement) return; var d = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, { acceptNode: function (a) { return !a || !a.focus || 0 > a.tabIndex ? NodeFilter.FILTER_SKIP : b.contains(a) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT } }); d.currentNode = b; d = (-1 === Math.sign(f) ? d.previousNode : d.nextNode).bind(d); for (var e; e = d();)if (e.focus(), (c || document).activeElement !== g) return
          } a.blur()
        }
      } (function (a) {
        var b = document.createElement("style"); b.type = "text/css"; b.styleSheet ?
          b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)); document.body.appendChild(b)
      })("/*[inert]*/* [inert]{ -webkit - user - select: none; -moz - user - select: none; -ms - user - select: none; user - select: none; pointer - events: none } "); var n = function (a) { return null }; window.ShadowRoot && (n = function (a) { for (; a && a !== document.documentElement;) { if (a instanceof window.ShadowRoot) return a; a = a.parentNode } return null }); var f = 0; document.addEventListener("keydown", function (a) { f = 9 === a.keyCode ? a.shiftKey ? -1 : 1 : 0 }); document.addEventListener("mousedown",
        function (a) { f = 0 }); var c = null; document.body.addEventListener("focus", function (a) { var b = e(a); a = b == a.target ? null : n(b); if (a != c) { if (c) { if (!(c instanceof window.ShadowRoot)) throw Error("not shadow root: " + c); c.removeEventListener("focusin", l, !0) } a && a.addEventListener("focusin", l, !0); c = a } m(b) }, !0); document.addEventListener("click", function (a) { var b = e(a); k(b) && (a.preventDefault(), a.stopPropagation()) }, !0)
    }));
  }

  self.constructor = function (dialogElem, invokerElem, center) {
    this.dialogElem = dialogElem;
    // Hide the dialog element to start with
    this.dialogElem.hidden = true;
    // Save the invoking element 
    // (this may not exist if the dialog is an interruption)
    this.invokerElem = invokerElem;
    // Save a collection of <body> children for making inert
    this.inertElems = document.querySelectorAll('body > *');
    // Save the first focusable link or button in the dialog
    // (to be focused on opening the dialog)
    this.firstControl = this.dialogElem.querySelector('a[href], button:not(:disabled)');
    this.closeButton = this.dialogElem.querySelector('.gef-action-dialog__close');
    // Move the dialog element to be a child of <body>
    // (needed for the `inert` functionality to work)
    document.body.appendChild(this.dialogElem);

    // Honor the center positioning if chosen
    if (center) {
      this.dialogElem.classList.add('gef-action-dialog__center');
    }

    // If the invoking element exists, 
    // listen to clicks for opening the dialog
    if (this.invokerElem) {
      this.invokerElem.addEventListener('click', function () {
        this.open();
      }.bind(this));
    }

    // If the close button exists,
    // listen to clicks for closing the dialog
    if (this.closeButton) {
      this.closeButton.addEventListener('click', function () {
        this.close();
      }.bind(this));
    }

    // Listen on the dialog element
    // to close the dialog on ESC
    this.dialogElem.addEventListener('keydown', function (e) {
      if (e.keyCode == 27) {
        this.close();
      }
    }.bind(this));
  }

  // The open method
  self.constructor.prototype.open = function () {
    // Add a class to the body for [inert] styling
    document.body.classList.add('gef-action-dialog--open');
    // Make all siblings of the dialog inert
    Array.prototype.forEach.call(this.inertElems, function (elem) {
      if (elem !== this.dialogElem) {
        elem.setAttribute('inert', 'inert');
      }
    }.bind(this));
    // Show the dialog
    this.dialogElem.hidden = false;
    // Focus the first of the controls
    this.firstControl.focus();
  }

  // The close method
  self.constructor.prototype.close = function () {
    document.body.classList.remove('gef-action-dialog--open');
    Array.prototype.forEach.call(this.inertElems, function (elem) {
      elem.removeAttribute('inert');
    }.bind(this));
    this.dialogElem.hidden = true;
    // Refocus the invoking element
    // if it exists
    if (this.invokerElem) {
      this.invokerElem.focus();
    }
  }

})();/**
 * Card
 * @namespace gef
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Card = {};

  self.init = function () {
  }

  self.constructor = function (cardElem) {
    var moreBtn = cardElem.querySelector('[aria-expanded="false"]');
    var moreElem = cardElem.querySelector('.gef-card__info');
    var moreHeading = moreElem.querySelector('.gef-card-info__heading');

    moreBtn.addEventListener('click', function () {
      moreElem.hidden = !moreElem.hidden;
      moreBtn.setAttribute('aria-expanded', !moreElem.hidden);
    });

    moreElem.addEventListener('keydown', function (e) {
      if (e.which === 27) {
        moreElem.hidden = true;
        moreBtn.setAttribute('aria-expanded', 'false');
        moreBtn.focus();
      }
    });
  }
})();/**
 * Carousel
 * @namespace gef
 * @method gef.Carousel.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Carousel = {};

  self.init = function () {
    /* inert attribute polyfill, from https://github.com/GoogleChrome/inert-polyfill */
    "inert" in HTMLElement.prototype || (Object.defineProperty(HTMLElement.prototype, "inert", { enumerable: !0, get: function () { return this.hasAttribute("inert") }, set: function (h) { h ? this.setAttribute("inert", "") : this.removeAttribute("inert") } }), window.addEventListener("load", function () {
      function h(a) {
        var b = null; try { b = new KeyboardEvent("keydown", { keyCode: 9, which: 9, key: "Tab", code: "Tab", keyIdentifier: "U+0009", shiftKey: !!a, bubbles: !0 }) } catch (g) {
          try {
            b = document.createEvent("KeyboardEvent"), b.initKeyboardEvent("keydown",
              !0, !0, window, "Tab", 0, a ? "Shift" : "", !1, "en")
          } catch (d) { }
        } if (b) { try { Object.defineProperty(b, "keyCode", { value: 9 }) } catch (g) { } document.dispatchEvent(b) }
      } function k(a) { for (; a && a !== document.documentElement;) { if (a.hasAttribute("inert")) return a; a = a.parentElement } return null } function e(a) { var b = a.path; return b && b[0] || a.target } function l(a) { a.path[a.path.length - 1] !== window && (m(e(a)), a.preventDefault(), a.stopPropagation()) } function m(a) {
        var b = k(a); if (b) {
          if (document.hasFocus() && 0 !== f) {
            var g = (c || document).activeElement;
            h(0 > f ? !0 : !1); if (g != (c || document).activeElement) return; var d = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, { acceptNode: function (a) { return !a || !a.focus || 0 > a.tabIndex ? NodeFilter.FILTER_SKIP : b.contains(a) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT } }); d.currentNode = b; d = (-1 === Math.sign(f) ? d.previousNode : d.nextNode).bind(d); for (var e; e = d();)if (e.focus(), (c || document).activeElement !== g) return
          } a.blur()
        }
      } (function (a) {
        var b = document.createElement("style"); b.type = "text/css"; b.styleSheet ?
          b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)); document.body.appendChild(b)
      })("/*[inert]*/*[inert]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"); var n = function (a) { return null }; window.ShadowRoot && (n = function (a) { for (; a && a !== document.documentElement;) { if (a instanceof window.ShadowRoot) return a; a = a.parentNode } return null }); var f = 0; document.addEventListener("keydown", function (a) { f = 9 === a.keyCode ? a.shiftKey ? -1 : 1 : 0 }); document.addEventListener("mousedown",
        function (a) { f = 0 }); var c = null; document.body.addEventListener("focus", function (a) { var b = e(a); a = b == a.target ? null : n(b); if (a != c) { if (c) { if (!(c instanceof window.ShadowRoot)) throw Error("not shadow root: " + c); c.removeEventListener("focusin", l, !0) } a && a.addEventListener("focusin", l, !0); c = a } m(b) }, !0); document.addEventListener("click", function (a) { var b = e(a); k(b) && (a.preventDefault(), a.stopPropagation()) }, !0)
    }));

    self.constructor = function (elem) {
      // Save refs to elements
      var scrollable = elem.querySelector('.gef-carousel__scrollable');
      var buttons = elem.querySelector('.gef-carousel__buttons');
      var list = elem.querySelector('.gef-carousel__list');
      var items = list.children;
      var prev = elem.querySelector('.gef-carousel__prev');
      var next = elem.querySelector('.gef-carousel__next');

      // Reveal button functionality now JS has run
      buttons.hidden = false;

      // Make the prev button disabled because
      // you can't 'go left' to begin with
      prev.disabled = true;

      // Scroll by half the container's width
      var scrollAmount = list.offsetWidth / 2;

      // Scroll incrementally by button
      prev.addEventListener('click', function (e) {
        scrollable.scrollLeft += -scrollAmount;
      });
      next.addEventListener('click', function (e) {
        scrollable.scrollLeft += scrollAmount;
      });

      function disableEnable() {
        prev.disabled = scrollable.scrollLeft < 1;
        next.disabled = scrollable.scrollLeft === list.scrollWidth - list.offsetWidth;
      }

      // Debounce the button disabling function on scroll
      var debounced;
      scrollable.addEventListener('scroll', function () {
        window.clearTimeout(debounced);
        debounced = setTimeout(disableEnable, 200);
      });

      // Only use if supported
      if ('IntersectionObserver' in window) {
        var observerSettings = {
          root: scrollable,
          threshold: 0.5
        }

        var callback = function (items, observer) {
          Array.prototype.forEach.call(items, function (item) {
            if (item.intersectionRatio > 0.5) {
              item.target.removeAttribute('inert');
            } else {
              // Makes items unfocusable and unavailable to assistive technologies
              item.target.setAttribute('inert', 'inert');
            }
          });
        }

        var observer = new IntersectionObserver(callback, observerSettings);
        Array.prototype.forEach.call(items, function (item) {
          observer.observe(item);
        });
      }
    }
  }
})();/**
 * Info Panel
 * @namespace gef
 * @method gef.InfoPanel.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.InfoPanel = {};

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
    this.elem.classList.add('gef-infopanel');
    this.elem.classList.add('gef-infopanel--with-js');

    // Save key elements
    this.button = this.elem.querySelector('.gef-infopanel__button');
    this.panel = this.elem.querySelector('.gef-infopanel__panel');
    this.closeButton = this.panel.querySelector('.gef-infopanel__close-button');

    // Add the alignment classes
    this.panel.classList.add(
      'gef-infopanel--' + settings.hAlign,
      'gef-infopanel--' + settings.vAlign
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
    document.addEventListener('click', this.closeOnBlur);
    // For adding `position: relative` dynamically
    // to avoid z-index issues
    this.elem.classList.add('gef-infopanel--showing');
    this.closeButton.focus();
  }

  // The close method
  self.constructor.prototype.close = function () {
    this.panel.hidden = true;
    this.button.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', this.closeOnBlur);
    this.elem.classList.remove('gef-infopanel--showing');
  }
})();/**
 * Masthead
 * @namespace gef
 * @method gef.Masthead.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Masthead = {};

  self.init = function () {
  }

  self.constructor = function (elem) {
    // Add JS class for upgrading styles
    elem.classList.add('gef-masthead--with-js');

    // Save an object of all submenus
    var links = elem.querySelector('.gef-masthead__links');
    var menus = [
      {
        link: elem.querySelector('.gef-masthead__alerts-option a'),
        target: elem.querySelector('.gef-masthead__alerts')
      },
      {
        link: elem.querySelector('.gef-masthead__more-option a'),
        target: elem.querySelector('.gef-masthead__more-menu')
      }
    ];

    menus.forEach(function (menu) {
      menu.first = menu.target.querySelector('a[href], button:not([disabled]), input');
      if (!menu.first) {
        menu.first = menu.target.querySelector('h2, h3, h4');
        menu.first.tabIndex = -1;
      }
      menu.link.addEventListener('click', function (e) {
        e.preventDefault();
        menus.forEach(function (otherMenu) {
          if (otherMenu !== menu) {
            otherMenu.target.style.display = 'none';
          }
        });

        var open = menu.target.style.display === 'block' || false;
        menu.target.style.display = open ? 'none' : 'block';
        if (!open) {
          menu.first.focus();
        }
      });

      var closeButton = document.createElement('button');
      closeButton.innerHTML = '<span class="gef-sr">Close</span><svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false" viewBox="0 0 32 32"> <path d="M32 3.5L28.5 0 16 12.5 3.5 0 0 3.5 12.5 16 0 28.5 3.5 32 16 19.5 28.5 32l3.5-3.5L19.5 16"/> </svg>';
      closeButton.classList.add('gef-masthead__close-button');
      closeButton.addEventListener('click', function () {
        menu.target.style.display = 'none';
        menu.link.focus();
      });
      menu.target.appendChild(closeButton);
    });

    // Watch the visibility of masthead link items to add
    // or drop from the UI
    if ('IntersectionObserver' in window) {
      links.classList.add('gef-masthead__links-observed');
      var items = links.querySelectorAll('li');
      var observerSettings = {
        root: links,
        threshold: 0.98
      }

      var callback = function (items, observer) {
        Array.prototype.forEach.call(items, function (item) {
          if (item.intersectionRatio > 0.98) {
            item.target.classList.remove('gef-masthead__link-hidden');
          } else {
            item.target.classList.add('gef-masthead__link-hidden');
          }
        });
      }

      var observer = new IntersectionObserver(callback, observerSettings);
      Array.prototype.forEach.call(items, function (item) {
        observer.observe(item);
      });
    }
  }
})();/**
 * Pocket
 * @namespace gef
 * @method gef.Pocket.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Pocket = {};

  self.init = function () {
    /* inert attribute polyfill, from https://github.com/GoogleChrome/inert-polyfill */
    "inert" in HTMLElement.prototype || (Object.defineProperty(HTMLElement.prototype, "inert", { enumerable: !0, get: function () { return this.hasAttribute("inert") }, set: function (h) { h ? this.setAttribute("inert", "") : this.removeAttribute("inert") } }), window.addEventListener("load", function () {
      function h(a) {
        var b = null; try { b = new KeyboardEvent("keydown", { keyCode: 9, which: 9, key: "Tab", code: "Tab", keyIdentifier: "U+0009", shiftKey: !!a, bubbles: !0 }) } catch (g) {
          try {
            b = document.createEvent("KeyboardEvent"), b.initKeyboardEvent("keydown",
              !0, !0, window, "Tab", 0, a ? "Shift" : "", !1, "en")
          } catch (d) { }
        } if (b) { try { Object.defineProperty(b, "keyCode", { value: 9 }) } catch (g) { } document.dispatchEvent(b) }
      } function k(a) { for (; a && a !== document.documentElement;) { if (a.hasAttribute("inert")) return a; a = a.parentElement } return null } function e(a) { var b = a.path; return b && b[0] || a.target } function l(a) { a.path[a.path.length - 1] !== window && (m(e(a)), a.preventDefault(), a.stopPropagation()) } function m(a) {
        var b = k(a); if (b) {
          if (document.hasFocus() && 0 !== f) {
            var g = (c || document).activeElement;
            h(0 > f ? !0 : !1); if (g != (c || document).activeElement) return; var d = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, { acceptNode: function (a) { return !a || !a.focus || 0 > a.tabIndex ? NodeFilter.FILTER_SKIP : b.contains(a) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT } }); d.currentNode = b; d = (-1 === Math.sign(f) ? d.previousNode : d.nextNode).bind(d); for (var e; e = d();)if (e.focus(), (c || document).activeElement !== g) return
          } a.blur()
        }
      } (function (a) {
        var b = document.createElement("style"); b.type = "text/css"; b.styleSheet ?
          b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)); document.body.appendChild(b)
      })("/*[inert]*/*[inert]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"); var n = function (a) { return null }; window.ShadowRoot && (n = function (a) { for (; a && a !== document.documentElement;) { if (a instanceof window.ShadowRoot) return a; a = a.parentNode } return null }); var f = 0; document.addEventListener("keydown", function (a) { f = 9 === a.keyCode ? a.shiftKey ? -1 : 1 : 0 }); document.addEventListener("mousedown",
        function (a) { f = 0 }); var c = null; document.body.addEventListener("focus", function (a) { var b = e(a); a = b == a.target ? null : n(b); if (a != c) { if (c) { if (!(c instanceof window.ShadowRoot)) throw Error("not shadow root: " + c); c.removeEventListener("focusin", l, !0) } a && a.addEventListener("focusin", l, !0); c = a } m(b) }, !0); document.addEventListener("click", function (a) { var b = e(a); k(b) && (a.preventDefault(), a.stopPropagation()) }, !0)
    }));
  }

  self.constructor = function (elem, height, continueText) {
    this.elem = elem;
    this.height = height;
    this.continueText = continueText || 'Continued below...';
    this.truncated = this.elem.querySelector('.gef-pocket__truncated');

    // Feature detect IntersectionObserver before continuing
    if ('IntersectionObserver' in window) {
      // Set up InstersectionObserver to work on child elements
      // of the truncated wrapper
      const truncatedItems = this.truncated.children;
      var observerSettings = {
        root: this.truncated,
        threshold: [0.9]
      }

      var callback = function (items, observer) {
        Array.prototype.forEach.call(items, function (item) {
          if (!item.isIntersecting) {
            // Add the inert attr if the element is cut off
            // or invisible
            item.target.setAttribute('inert', 'inert');
          } else {
            // Remove inert from all elements when the
            // truncated element's height becomes 'auto'
            item.target.removeAttribute('inert');
          }
        });
      }

      // Apply the observer
      var observer = new IntersectionObserver(callback, observerSettings);
      Array.prototype.forEach.call(truncatedItems, function (item) {
        observer.observe(item);
      });

      // Create the footer element
      this.foot = document.createElement('div');
      this.foot.classList.add('gef-pocket__foot');

      // Create the 'show more' button
      this.button = document.createElement('button');
      this.button.classList.add('gef-button');
      this.foot.appendChild(this.button);

      // Define the icon 
      this.buttonIcon = '<svg viewBox="0 0 32 32" aria-hidden="false" focusable="false"><path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>';

      // Append the footer element after the 
      // truncated element
      this.elem.appendChild(this.foot);

      // Create continue element
      this.continue = document.createElement('div');
      this.continue.textContent = this.continueText;
      this.continue.classList.add('gef-pocket__continue');
      this.continue.tabIndex = -1;

      // Toggle on click
      this.button.addEventListener('click', function () {
        this.shown ? this.showLess() : this.showMore();
        this.foot.classList.toggle('gef-pocket--foot-shown');
      }.bind(this));

      // Show less initially
      this.showLess();
    }
  }

  // Unveil the hidden content
  self.constructor.prototype.showMore = function () {
    this.shown = true;
    this.next = this.truncated.querySelector('[inert]').previousElementSibling;
    this.truncated.style.height = 'auto';
    this.truncated.insertBefore(this.continue, this.next);
    this.continue.focus();
    this.button.innerHTML = '<span>Show less</span> ' + this.buttonIcon;
  }

  // Reset to truncated state
  self.constructor.prototype.showLess = function () {
    this.shown = false;
    this.truncated.style.height = this.height;
    this.truncated.contains(this.continue) && this.continue.parentNode.removeChild(this.continue);
    this.button.innerHTML = '<span>Show more</span> ' + this.buttonIcon;
  }
})();/**
 * Site menu
 * @namespace gef
 * @method gef.SiteMenu.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.SiteMenu = {};

  self.init = function () { }

  self.constructor = function (elem) {
    elem.classList.add('gef-sitemenu--with-js');
    this.moreButtons = elem.querySelectorAll('.gef-sitemenu__more-button');
    this.menuButton = elem.querySelector('.gef-sitemenu__menu-button');
    this.menu = elem.querySelector('.gef-sitemenu__list');

    Array.prototype.forEach.call(this.moreButtons, function (btn) {
      var submenu = btn.nextElementSibling;
      submenu.hidden = true;
      if (submenu.querySelector('[aria-current]')) {
        this.submenuToggle(btn);
      }

      btn.addEventListener('click', function () {
        this.submenuToggle(btn);
      }.bind(this));
    }.bind(this));

    this.menuButton.addEventListener('click', function () {
      this.menuToggle();
    }.bind(this));
  }

  self.constructor.prototype.submenuToggle = function (btn) {
    Array.prototype.forEach.call(this.moreButtons, function (otherBtn) {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.nextElementSibling.hidden = true;
      }
    });

    var currentState = btn.getAttribute('aria-expanded') === 'true' || false;
    var submenu = btn.nextElementSibling;
    btn.setAttribute('aria-expanded', !currentState);
    submenu.hidden = currentState;
  }

  self.constructor.prototype.menuToggle = function () {
    var currentState = this.menuButton.getAttribute('aria-expanded') === 'true' || false;
    this.menuButton.setAttribute('aria-expanded', !currentState);
    this.menu.classList.toggle('gef-sitemenu__open', !currentState);
  }
})();/**
 * Switch
 * @namespace gef
 * @method gef.Switch.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Switch = {};

  self.init = function () { }

  self.constructor = function (button) {
    this.button = button;
    // The 'on/off' text is provided in an aria-hidden <span>
    this.onOffSpan = this.button.querySelector('[aria-hidden]');

    // Set aria-pressed to false if the attribute is absent
    let currentState = this.button.getAttribute('aria-pressed') === 'true';
    this.button.setAttribute('aria-pressed', currentState);
    // Set the span's text to match the state
    this.onOffSpan.textContent = currentState ? 'on' : 'off';

    // Bind to the toggle method
    this.button.addEventListener('click', this.toggle.bind(this));
  }

  // The toggle method
  self.constructor.prototype.toggle = function () {
    let currentState = this.button.getAttribute('aria-pressed') === 'true';
    this.button.setAttribute('aria-pressed', !currentState);
    this.onOffSpan.textContent = currentState ? 'off' : 'on';
  }
})();/**
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

})();/**
 * Validation
 * @namespace gef
 * @method gef.Validation.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Validation = {};

  self.init = function () {
    // Polyfill the `find` array method
    Array.prototype.find || Object.defineProperty(Array.prototype, 'find', { value: function (r) { if (null == this) throw new TypeError('"this" is null or not defined'); var e = Object(this), t = e.length >>> 0; if ("function" != typeof r) throw new TypeError('predicate must be a function'); for (var n = arguments[1], i = 0; i < t;) { var o = e[i]; if (r.call(n, o, i, e)) return o; i++; } }, configurable: !0, writable: !0 });
  }

  self.constructor = function (formElem, rules, options) {
    // Defaults for the options object
    var settings = {
      warning: 'Please fix the errors in the form before continuing',
      prefix: '<strong>Error:</strong>',
      debounce: 500
    };

    // Overwrite defaults where they are provided in options
    for (var setting in options) {
      if (options.hasOwnProperty(setting)) {
        settings[setting] = options[setting];
      }
    }

    // Turn off native browser validation
    formElem.setAttribute('novalidate', true);

    // Initialize errors array for tracking
    var allErrors = [];

    // Get submit button
    var submit = formElem.querySelector('[type="submit"]');
    // Create and insert general message live region
    var warn = document.createElement('div');
    warn.setAttribute('aria-live', 'assertive');
    warn.classList.add('gef-form__warning');
    submit.parentNode.insertBefore(warn, submit);

    // Do not initially bother users by validating for required
    var testRequired = false;

    // Add errors if they don't already exist
    function saveError(name) {
      if (allErrors.indexOf(name) < 0) {
        allErrors.push(name);
      }
    }

    // Delete errors
    function deleteError(name) {
      allErrors = allErrors.filter(function (f) {
        return f !== name;
      });
    }

    // Function to show or hide warning live region
    function showHideWarn() {
      var message = allErrors.length > 0 ? settings.prefix + ' ' + settings.warning : '';
      warn.innerHTML = message;
    }

    // Switch field to valid state
    function toValid(field, errorElem) {
      field.setAttribute('aria-invalid', 'false');
      errorElem.innerHTML = '';
    }

    // Switch field to invalid state
    function toInvalid(field, errorElem, message) {
      field.setAttribute('aria-invalid', 'true');
      errorElem.innerHTML = settings.prefix + ' ' + message;
    }

    // Field validation function
    function validate(field) {
      // Get the error element
      var errorElem = document.getElementById(field.name + '-error');

      // Find the relevant rule
      var rule = rules.find(function (r) {
        return r.name === field.name;
      });

      // Validate for required first
      // if its being observed
      if (rule.required) {
        if (field.value.trim() === '' && testRequired) {
          toInvalid(field, errorElem, 'This field is required');
          saveError(field.name);
          return;
        } else {
          toValid(field, errorElem);
          deleteError(field.name);
          showHideWarn();
        }
      }

      // Test against each rule in `test`
      if (rule.tests) {
        // Find the first test that returns true if it exists
        var errored = rule.tests.find(function (t) {
          return t.error(field.value);
        });

        // Switch validation state
        if (errored) {
          toInvalid(field, errorElem, errored.message);
          saveError(field.name);
        } else {
          toValid(field, errorElem);
          deleteError(field.name);
          showHideWarn();
        }
      }
    }

    // Get all elements defined in the rules object
    var fields = rules.map(function (rule) {
      return document.querySelector('[name="' + rule.name + '"]');
    });

    // Initialize error markup and bindings
    fields.forEach(function (field, index) {
      // Set aria-describedby
      field.setAttribute('aria-describedby', field.name + '-error');

      // If `required`, set `aria-required`
      if (rules[index].required) {
        field.setAttribute('aria-required', 'true');
      }

      // Bind to keyup event
      var debounced;
      field.addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        // Don't run on the Tab and Shift keys
        if (key !== 9 && key !== 16) {
          window.clearTimeout(debounced);
          debounced = setTimeout(function () {
            validate(field);
          }, settings.debounce);
        }
      });
    });

    // Listen on submit
    formElem.addEventListener('submit', function (e) {
      e.preventDefault();
      fields.forEach(function (field) {
        testRequired = true;
        validate(field);
      });
      showHideWarn();
    });
  }
})();/**
 * Video
 * @namespace gef
 * @method gef.Video.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Video = {};

  self.init = function () { }

  self.videoInit = function (video, captions) {
    // Listen for when the video is ready
    video.addEventListener('loadedmetadata', function () {
      // Remove the native controls
      video.controls = false;
      if (captions) {
        // Show captions track
        // (This method only supports one track)
        video.textTracks[0].mode = 'showing';
      }
    });
  }

  self.playButton = function (button, video) {
    button.addEventListener('click', function () {
      // Pause or play the video based on its current state
      video.paused || video.ended ? video.play() : video.pause();
      // Add the active class for affecting the button's labeling
      button.classList.toggle('active');
    });

    // Revert the play button when the video ends
    video.addEventListener('ended', function () {
      button.classList.remove('active');
    });
  }

  self.muteButton = function (button, video) {
    var toggleMute = function () {
      // Toggle the muted property
      video.muted = !video.muted;
      button.classList.toggle('active');
    }
    button.addEventListener('click', toggleMute);
    video.addEventListener('loadedmetadata', function () {
      // If the video is set to autoplay, mute by default
      if (video.autoplay) {
        toggleMute();
      }
    });
  }

  self.scrub = function (range, video) {
    var getMins = function (secs) {
      let mins = Math.floor(secs / 60);
      let remainder = secs - mins * 60;
      return mins + ' minutes and ' + Math.round(remainder) + ' seconds';
    }

    video.addEventListener('loadedmetadata', function () {
      // Map range input's props to the video's
      range.min = 0;
      range.max = video.duration;
      range.value = 0;
      // Translate the values for assistive technologies
      range.setAttribute('aria-valuemin', '0 seconds');
      range.setAttribute('aria-valuemax', getMins(video.duration));
      range.setAttribute('aria-valuenow', '0 seconds');
    });

    video.addEventListener('timeupdate', function () {
      // map the value to the currentTime of the video
      range.value = video.currentTime;
      // Translate this for assistive technologies
      range.setAttribute('aria-valuenow', getMins(video.currentTime));
    });

    // 
    range.addEventListener('input', function () {
      // map the currentTime of the video to the value
      video.currentTime = range.value;
    });
  }
})();