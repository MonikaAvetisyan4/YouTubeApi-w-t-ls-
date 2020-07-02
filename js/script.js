let sVal,base,img,videoId,ifr,p,imageSrc,Title,div,glxavor,naxnakansSrcMecIfr;
const key    ='AIzaSyDeD51BDVfcLEYmIyflzVLsMsjuYGq9IL4';
const result = 20;

//This function for taking value of input and empty all data while clicking button
function searchInfo(){
   sVal=document.querySelector('.search').value;
   document.querySelector('#first').innerHTML ='';
   document.querySelector('#second').innerHTML='';
   document.querySelector('span').innerHTML   ='';
    console.log(sVal)
    getIfr(sVal);

 }
 //This for combine search values
document.querySelector('.search').addEventListener("change", (event) => {
    let value = (event.target.value).split(' ').join('+');  
})

//This for press Enter from keyboard, will make the same actions as clickin button
document.querySelector('.search').addEventListener('keydown', function(e) {
    if (e.which == 13) {
        // console.log(e) ;
        sVal=document.querySelector('.search').value;
        document.querySelector('#first').innerHTML ='';
        document.querySelector('#second').innerHTML='';
        document.querySelector('span').innerHTML   ='';
        console.log(sVal)
        getIfr(sVal);
    }
});
//This function for request (ajax)
function getIfr(sVal) {
    return new Promise(function(resolve, reject) {
    let xhttp = new XMLHttpRequest();
        xhttp.open('GET', `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${result}&q=${sVal}&key=${key}`, true);
        xhttp.send();
        xhttp.onload = function () {
                    if (this.status == 200) {
                                resolve(show(JSON.parse(this.response)));
                    } else { 
                             reject(alert(this.status));
                           }     
              }
        }

    )}

function show(base){
                 console.log(base);
                videoId = base.items[0].id.videoId;
                //Creating iframe for #first div and giving it src 
                ifr = document.createElement('iframe');
                ifr.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
                document.getElementById('first').appendChild(ifr);
                //Creating h1 for the title of ifriame video
                p = document.createElement('h1');
                p.innerHTML=base.items[0].snippet.title;
                document.querySelector('.sp').append(p);

                // console.log(base.items[0].snippet.publishTime)
                //Creating p for publishing time
                publish = document.createElement('strong');
                publish.innerHTML=`<i><span>Publish Time : </span><h3>${base.items[0].snippet.publishTime}</h3></i>`;
                document.querySelector('.sp').append(publish);
                document.querySelector('strong').setAttribute('data-ch',`${base.items[0].snippet.channelTitle}`)

                //This loop for creating every item for the #second div
                for (let i = 1; i < result; i++) {
                     
                     //Declare variables for keeping every items img src and title from the #second div 
                     imageSrc = base.items[i].snippet.thumbnails.medium.url;
                     Title = base.items[i].snippet.title;
                     
                     //Creating img for every div from #second, and transfer it src that we declared
                     img = document.createElement('img');
                     img.setAttribute('src', imageSrc);

                     //Creating div for every img from #second div  and diving its data-variables, for keeping info
                     div=document.createElement('div');
                     div.setAttribute('class', 'mainDiv');
                     mainDiv=document.querySelectorAll('.mainDiv');
                     div.setAttribute('data-id', `${base.items[i].id.videoId}`);
                     div.setAttribute('data-step', `${i}`);
                     div.setAttribute('data-title', `${Title}`);
                     div.setAttribute('data-publish',`${base.items[i].snippet.publishTime}`)
                     div.setAttribute('data-spik',`${base.items[i].snippet.channelTitle}`)
               
                     document.getElementById('second').appendChild(div);
                     //this for every div fro  #second giving it title,img src,and icon
                     div.innerHTML = `<img src=${imageSrc} alt="image" > <i class="fa fa-youtube-play" id='icon' style="font-size:30px"></i> <h3 style="color: black">${Title} <a class="spik" href='#' >Channel Name : ${base.items[i].snippet.channelTitle}</a><br> <i><p>${base.items[i].snippet.publishTime}</p></i></h3>`;
                    
                }
                     reserve();

                   
}

//This function for reserve src from div[i] click
function reserve(){
     let mainDiv=document.querySelectorAll('.mainDiv');
     // console.log(mainDiv.length)
                    for(let i=0 ;i<mainDiv.length; i++){
                        mainDiv[i].addEventListener('click', function(){
                            //Taking data-variables from #second (div this element)
                            let id  =this.getAttribute('data-id');
                            let step=this.getAttribute('data-step');
                            let dataTitle=this.getAttribute('data-title');
                            let publishData=this.getAttribute('data-publish');
                            let channelTitle=this.getAttribute('data-spik');

                            //taking channel title  html initial
                            let naxnakanChannelTitle=  document.querySelector('strong').getAttribute('data-ch')
                            console.log(naxnakanChannelTitle)

                            //taking publish time html initial
                            let naxnakanPublish=document.querySelector('strong h3').innerHTML;
                             // console.log(naxnakanPublish)

                            //Taking value from ifrime (#first div (big))
                            let title=document.querySelector('span h1').innerHTML;

                            //Taking initial src from ifrime (#first div (big)) for to keep
                            naxnakansSrcMecIfr=ifr.src;
                            let resultId=naxnakansSrcMecIfr.substring(30);

                            //Transfer ifriame src from #first div img src
                            ifr.removeAttribute('src');
                            ifr.setAttribute('src',`https://www.youtube.com/embed/${id}`);


                            //Changing data-variables from #second(div this element) 
                            //Because i changes only innerHTML not the data-items which I use every time
                            //When we click the img, it will change, but when we will click again the 
                            //After clicking the third time iframe src will not change
                            // becasue the div[i] data-variables  will be the previous 
                            // that is way we need to change data-variables also
                            this.innerHTML = `<img src="https://i.ytimg.com/vi/${resultId}/hqdefault.jpg" alt="image" > <i class="fa fa-youtube-play"  id='icon'style=" font-size: 30px;"></i> <h3 style="color: black">${title}<a class="spik" href='#' >Channel Name : ${naxnakanChannelTitle}</a> <i>${naxnakanPublish} </i></h3> `;
                            this.removeAttribute('data-id');
                            this.setAttribute('data-id',`${resultId}`);

                            this.removeAttribute('data-title');
                            this.setAttribute('data-title',`${title}`);

                            this.removeAttribute('data-publish');
                            this.setAttribute('data-publish',`${naxnakanPublish}`);
                            
                            this.removeAttribute('data-spik')
                            this.setAttribute('data-spik',`${naxnakanChannelTitle}`)

                            document.querySelector('strong').removeAttribute('data-ch')
                            document.querySelector('strong').setAttribute('data-ch',`${channelTitle}`)
                              
                            document.querySelector('span h1').innerHTML=dataTitle;
                            document.querySelector('strong h3').innerHTML=publishData;
                        
                            
                    })                          
            }
}