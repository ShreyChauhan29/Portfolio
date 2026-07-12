// Site guard: content-protection deterrents + lightweight activity logging.
// Loaded by every page (SPA, agents.html, blog pages, 404.html).
;(function () {
  'use strict'

  // After creating a free account at goatcounter.com, put your site code here
  // (e.g. 'shreychauhan' for https://shreychauhan.goatcounter.com) to collect
  // visitor stats from EVERY device into your private dashboard.
  var GOATCOUNTER_CODE = ''

  var LOG_KEY = 'sc-visitor-log'
  var MAX_EVENTS = 800
  var sessionStart = Date.now()

  // ------------------------------------------------------------------ logging
  function readLog() {
    try {
      return JSON.parse(localStorage.getItem(LOG_KEY) || '[]')
    } catch (e) {
      return []
    }
  }
  function log(type, detail) {
    try {
      var events = readLog()
      events.push({ t: Date.now(), type: type, detail: String(detail || ''), page: location.pathname + location.hash })
      if (events.length > MAX_EVENTS) events = events.slice(events.length - MAX_EVENTS)
      localStorage.setItem(LOG_KEY, JSON.stringify(events))
    } catch (e) {
      /* storage unavailable */
    }
    if (GOATCOUNTER_CODE && window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: 'event/' + type + (detail ? '/' + detail : ''), event: true })
    }
  }
  window.__scLog = log
  window.__scReadLog = readLog

  // Visit + duration tracking
  log('visit', document.title.split('|')[0].trim())
  var durationLogged = false
  function logDuration() {
    if (durationLogged) return
    durationLogged = true
    log('duration', Math.max(1, Math.round((Date.now() - sessionStart) / 1000)) + 's')
  }
  window.addEventListener('pagehide', logDuration)
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') logDuration()
  })

  // ------------------------------------------------------------------- toast
  var toastEl = null
  var toastTimer = null
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div')
      toastEl.setAttribute('role', 'alert')
      toastEl.style.cssText =
        'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:99999;' +
        'background:rgba(15,10,25,0.95);color:#fda4af;border:1px solid rgba(244,63,94,0.4);' +
        'padding:10px 20px;border-radius:12px;font:600 13px Inter,system-ui,sans-serif;' +
        'box-shadow:0 10px 30px rgba(0,0,0,0.5);pointer-events:none;opacity:0;transition:opacity .25s'
      document.body.appendChild(toastEl)
    }
    toastEl.textContent = msg
    toastEl.style.opacity = '1'
    clearTimeout(toastTimer)
    toastTimer = setTimeout(function () {
      toastEl.style.opacity = '0'
    }, 2200)
  }

  // -------------------------------------------------------------- protection
  function guard() {
    // Disable text selection everywhere except form fields
    var style = document.createElement('style')
    style.textContent =
      'body{-webkit-user-select:none;-moz-user-select:none;user-select:none}' +
      'input,textarea{-webkit-user-select:text;user-select:text}' +
      'img{-webkit-user-drag:none;user-drag:none}'
    document.head.appendChild(style)

    document.addEventListener('contextmenu', function (e) {
      e.preventDefault()
      var onImage = e.target && e.target.tagName === 'IMG'
      toast(onImage ? '⚠ Image downloads are disabled on this site' : '⚠ Right-click is disabled on this site')
      log('blocked', onImage ? 'image-save-attempt' : 'right-click')
    })

    document.addEventListener('copy', function (e) {
      e.preventDefault()
      if (e.clipboardData) e.clipboardData.setData('text/plain', '')
      toast('⚠ Copying content is disabled on this site')
      log('blocked', 'copy')
    })
    document.addEventListener('cut', function (e) {
      e.preventDefault()
      toast('⚠ Copying content is disabled on this site')
      log('blocked', 'cut')
    })

    document.addEventListener('dragstart', function (e) {
      if (e.target && e.target.tagName === 'IMG') {
        e.preventDefault()
        toast('⚠ Image downloads are disabled on this site')
        log('blocked', 'image-drag')
      }
    })

    document.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase()
      if ((e.ctrlKey || e.metaKey) && (k === 's' || k === 'u' || k === 'p')) {
        e.preventDefault()
        toast('⚠ This action is disabled on this site')
        log('blocked', 'shortcut-ctrl-' + k)
      }
    })
  }

  if (document.body) guard()
  else document.addEventListener('DOMContentLoaded', guard)

  // ------------------------------------------------------------- goatcounter
  if (GOATCOUNTER_CODE) {
    var s = document.createElement('script')
    s.async = true
    s.src = 'https://gc.zgo.at/count.js'
    s.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count')
    document.head.appendChild(s)
  }
})()
