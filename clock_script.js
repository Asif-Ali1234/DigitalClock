
var ms=0,hr=0,sec=0,stpmin=0;

var stpwtchsettime=0,timersettime=0

function updatetime(){
    var d=new Date()

    seconds=d.getSeconds()

    min=d.getMinutes()

    hrs=d.getHours()
    if(seconds<=9){
        seconds='0'+seconds
    }
    if(min<=9){
        min='0'+min
    }
    if(hrs<=9){
        hrs='0'+hrs
    }
    res=[hrs,min,seconds]
    tags=['hrs','min','sec']
    for(var i=0;i<tags.length;i++){
        document.getElementById(tags[i]).innerHTML=res[i]+' <sup>'+tags[i]+'</sup>'
    }
}

function clockinitialising(){
    updatetime()
    window.setInterval("updatetime()",1000)
}


function changemode(id){
    var actives=document.getElementsByClassName('active')
    for(var i=0;i<actives.length;i++){
        actives[i].classList.remove('active')
    }
    var lab=document.getElementById(id)
    lab.classList.toggle('active')
    if(id=="clkmode"){
        document.getElementById('clk').style.display="block"
        document.getElementById('stpwatch').style.display="none"
        document.getElementById('timer').style.display="none"
        document.body.style.backgroundColor="#99ccff"
    }
    else if(id=="stpwtchmode"){
        document.getElementById('clk').style.display="none"
        document.getElementById('stpwatch').style.display="block"
        document.getElementById('timer').style.display="none"
        document.body.style.backgroundColor="#ffccff"
    }
    else if(id=="timermode"){
        document.getElementById('clk').style.display="none"
        document.getElementById('stpwatch').style.display="none"
        document.getElementById('timer').style.display="block"
        document.body.style.backgroundColor="#ffff80"
    }
}


function startstpwtch(){
    ms++
    if(ms==100){
        ms=1
        sec++
        if(sec==60){
            sec=0
            stpmin++
            if(stpmin==60){
                stpmin=0
                hr++
                if(hr<=9){
                    hr='0'+hr
                }
                document.getElementById('stphrs').innerHTML=hr+' <sup>hrs</sup>'
            }
            if(stpmin<=9){
                stpmin='0'+stpmin
            }
            document.getElementById('stpmin').innerHTML=stpmin+' <sup>Min</sup>'
        }
        if(sec<=9){
            sec='0'+sec
        }
        document.getElementById('stpsec').innerHTML=sec+' <sup>Sec</sup>'
    }
    if(ms<=9){
        ms='0'+ms
    }
    document.getElementById('stpmillisec').innerHTML=ms
    stpwtchsettime=setTimeout(startstpwtch,8)

    document.getElementById('stpwtchstartbtn').style.display="none"

    document.getElementById('stpwtchpausebtn').style.display="block"

    document.getElementById('stpwtchlapsebtn').style.display="block"

    document.getElementById('stpwtchstopbtn').style.display="none"

}



function pausestpwtch(){
    clearTimeout(stpwtchsettime)
    document.getElementById('stpwtchlapsebtn').style.display="none"
    document.getElementById('stpwtchstartbtn').style.display="block"
    document.getElementById('stpwtchpausebtn').style.display="none"
    document.getElementById('stpwtchstopbtn').style.display="block"
}

function lapsestpwtch(){
    clearTimeout(stpwtchsettime)
    var s=sec
    var m=stpmin
    var h=hr
    var milli=ms
    stpwtchsettime=setTimeout(startstpwtch,8)
    var lapsedtime=h+':'+m+':'+s+':'+milli

    document.getElementById('timestamps').innerHTML+='<i class="fas fa-flag-checkered" style="color:darkgray;font-size:25px;margin-right:15px"></i>'+lapsedtime+'<br>'

}

function stopstpwtch(){
    clearTimeout(stpwtchsettime)
    document.getElementById('stphrs').innerHTML="00"
    document.getElementById('stpmin').innerHTML="00"
    document.getElementById('stpsec').innerHTML="00"
    document.getElementById('stpmillisec').innerHTML="00"
    document.getElementById('timestamps').innerHTML=''
    document.getElementById('stpwtchstartbtn').style.display="block"
    document.getElementById('stpwtchlapsebtn').style.display="none"
    document.getElementById('stpwtchpausebtn').style.display="none"
    document.getElementById('stpwtchstopbtn').style.display="none"
    ms=0
    hr=0
    sec=0
    stpmin=0
}


function increasenumber(id){
    var num=document.getElementById(id).innerHTML
    num=parseInt(num)
    if(id=="timerhrs" && num==23){
        num=0
    }
    else if(num==59){
        num=0
    }
    else{
        num++
    }
    if(num<=9)
    {
        num='0'+num
    }
    document.getElementById(id).innerHTML=num
}


function decreasenumber(id){
    var num=document.getElementById(id).innerHTML
    num=parseInt(num)
    if(id=="timerhrs" && num==0){
        num=23
    }
    else if(num==0){
        num=59
    }
    else{
        num--
    }
    if(num<=9)
    {
        num='0'+num
    }
    document.getElementById(id).innerHTML=num
}


function starttimer(){
    var timersec=parseInt(document.getElementById('timersec').innerHTML)
    var timermin=parseInt(document.getElementById('timermin').innerHTML)
    var timerhrs=parseInt(document.getElementById('timerhrs').innerHTML)
    document.getElementById('alertmsg').innerHTML=''
    if(timersec==0 && timermin==0 && timerhrs==0){
        document.getElementById('alertmsg').innerHTML="Time's Up"
        stoptimer()
    }
    else{
        if(timersec != 0)
            timersec--
        else if(timersec==0 && timermin!=0){
            timermin--
            timersec=59
        }
        else if(timersec==0 && timermin==0 && timerhrs!=0){
            timerhrs--
            timermin=59
            timersec=59
        }
        if(timersec==0 && timermin==0 && timerhrs==0){
            document.getElementById('alertmsg').innerHTML="Time's Up"
            stoptimer()
        }
        else{
            if(timersec<=9){
                timersec='0'+timersec
            }
            if(timermin<=9){
                timermin='0'+timermin
            }
            if(timerhrs<=9){
                timerhrs='0'+timerhrs
            }
            document.getElementById('timersec').innerHTML=timersec
            document.getElementById('timermin').innerHTML=timermin
            document.getElementById('timerhrs').innerHTML=timerhrs

            timersettime=setTimeout(starttimer,1000)
            document.getElementById('timerstartbtn').style.display="none"
            document.getElementById('timerpausebtn').style.display="block"
            document.getElementById('timerstopbtn').style.display="block"
        }
    }
}

function pausetimer()
{
    clearTimeout(timersettime)
    document.getElementById('timerstartbtn').style.display="block"
    document.getElementById('timerpausebtn').style.display="none"
}

function stoptimer(){
    clearTimeout(timersettime)
    document.getElementById('timerstartbtn').style.display="block"
    document.getElementById('timerpausebtn').style.display="none"
    document.getElementById('timerstopbtn').style.display="none"
    document.getElementById('timersec').innerHTML='00'
        document.getElementById('timermin').innerHTML='00'
        document.getElementById('timerhrs').innerHTML='00'
}