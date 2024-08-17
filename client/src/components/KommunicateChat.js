import React, { useEffect } from 'react';

const KommunicateChat = () => {
  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = 
          {"appId":"16b2731aea4022c8ffcbcb832d299cccf","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return null;
};

export default KommunicateChat;