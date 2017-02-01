/**
 *
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const loadScript = url => {
  if (!(/^http?/.test(url))) {
    url = location.origin + url;
  }

  const fullScriptURL = new URL(url);
  const existingScript =
      document.querySelector(`script[src="${fullScriptURL}"]`);

  if (existingScript) {
    return Promise.resolve(existingScript);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = _ => {
      resolve(script);
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

const removeElement = el => {
  el.parentNode.removeChild(el);
};

const preloadImage = url => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
};

const fire = (el, eventName, detail=null, bubbles=true, cancelable=true) => {
  let evt = new CustomEvent(eventName, {
    detail, bubbles, cancelable
  });

  el.dispatchEvent(evt);
};

export default {
  loadScript, removeElement, preloadImage, fire
};
