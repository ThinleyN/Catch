function addEventsForNav() {
    const navText = document.getElementsByClassName("navigation-text");

    $(navText).each(function(i,nav) {
        nav.addEventListener("click", function() {
            const navData = $(nav).attr("data");
            let navigateTo = $(nav).attr("ref");
            const allTextArea = $('.text-area');
            allTextArea.css("opacity", "0.3");
            const textArea = $(`#${navData}`);
            textArea.css("visibility","visible");
            textArea.css("opacity", 1);
            let text = textArea[0].innerHTML;
            text = String(text).substring(0,maxCharacters) + '...';
            textArea.empty();
            let interval = calculateLetterSpeed(text);
            showLetterbyLetter(textArea,text,0,interval);
            if(!mainAnimation){
                $(document.body).addClass('no-interaction');
                animate();
            }else{
                $(document.body).addClass('no-interaction');
                mainAnimation.resume();
            }
            if(!lastRun){
                setTimeout(function(){
                    $(document.body).removeClass('no-interaction');
                    mainAnimation.pause();
                    var loc = window.location.pathname;
                    var dir = loc.substring(0, loc.lastIndexOf('/'));
                    navigateTo = dir + navigateTo
                    setTimeout(function(){
                        window.open(navigateTo, '_blank');
                    },1000)
                },masterSpeed)
            }
        })
    });
}

function onload() {
    const content = document.getElementById("content");
    const arbTrack =  document.getElementById("arb-track");

    const styleOfContent = getComputedStyle(content);

    arbTrack.style.width = styleOfContent.width;
    arbTrack.style.height = styleOfContent.height;

    randomizePositionText();

    addEventsForNav();

}

document.addEventListener("DOMContentLoaded", onload);
