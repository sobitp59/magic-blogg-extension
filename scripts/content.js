

const insert = (content) => {
    // Find hashnode editor input section
    const elements = document.getElementsByClassName('ProseMirror prose');

    if (elements.length === 0) {
    return;
    }

    const element = elements[0];
  
    // Grab the first p tag so we can replace it with our injection
    const pToRemove = element.childNodes[0];
    pToRemove.remove();
  
    // Split content by \n
    const splitContent = content.split('\n');
    console.log(splitContent)
  
    // Wrap in p tags
    splitContent.forEach((content) => {
        const p = document.createElement('p');
      
        p.textContent = content;
      
        // Insert into HTML one at a time
        element.appendChild(p);
      });
    
    // On success return true
    return true;
  };



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'inject') {
      const { content } = request;
  
      console.log(content);
      const result = insert(content);

      if (!result) {
        sendResponse({ status: 'failed' });
      }
  
      sendResponse({ status: 'success' });
    }
  });