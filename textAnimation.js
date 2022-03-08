function randomizePositionText() {
    const content = document.getElementById("content");
    const styleOfContent = getComputedStyle(content);
    const heightOftContent = parseInt(styleOfContent.height,10) ;
    const widthOfContent = parseInt(styleOfContent.width,10);
    const contentEdges = content.getBoundingClientRect();

    const textAreas = document.getElementsByClassName("text-area");
    const randomIndex = Math.floor(Math.random() * (textAreas.length - 0 + 1)) + 0;
    for(let i = 0; i < textAreas.length;i++){
        const top =  Math.floor(Math.random() * (heightOftContent/2 - 0 + 1) + 0);
        const left =  Math.floor(Math.random() * (widthOfContent/2 - 0 + 1) + 0);

        textAreas.item(i).style.top = top + 'px';
        textAreas.item(i).style.left = left + 'px';
        if(getComputedStyle(textAreas.item(i)).width === widthOfContent + 'px'){
            textAreas.item(i).style.left = 0 + 'px';
        }
        
        const boundingArea = textAreas.item(i).getBoundingClientRect();
        if(boundingArea.right > contentEdges.right){
            textAreas.item(i).style.left = 0 +'px';
        }

        if(boundingArea.top + boundingArea.height > contentEdges.top + contentEdges.height){
            textAreas.item(i).style.top = 0 +'px';
        }

        if(i === randomIndex){
            textAreas.item(i).style.color = "rgb(47,204,58)";
        }

    }
}

function showLetterbyLetter (target, message, index, interval) {   
    if (index < message.length) {
      $(target).append(message[index++]);
      setTimeout(function () { showLetterbyLetter(target, message, index, interval); }, interval);
    } 
}