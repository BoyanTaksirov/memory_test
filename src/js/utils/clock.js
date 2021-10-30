export default class Clock 
{
    constructor(milliseconds)
    {
        this.interval = milliseconds;
        this.callbacks = [];
        this.handle;
        this.currentTimeMS;
        this.onInterval = this.onInterval.bind(this);
    }

    addCallbacks(callbacksArr)
    {
        for(let i = 0; i < callbacksArr.length; i++)
        {
            this.callbacks.push(callbacksArr[i]);
        }
    }

    removeCallbacks()
    {
        this.callbacks = [];
    }

    start()
    {
        this.reset();
        this.handle = setInterval(this.onInterval, this.interval);
    }

    reset()
    {
        clearInterval(this.handle);
        this.handle = null;
        this.currentTimeMS = 0;
    }

    pause()
    {
        clearInterval(this.handle);
        this.handle = null;
    }

    resume()
    {
        this.handle = setInterval(this.onInterval, this.interval);
    }

    onInterval()
    {
        this.currentTimeMS += this.interval;

        var timeString = this.getCurrentTimeString();
        this.printTimeStr(timeString);

        if(this.callbacks.length > 0)
        {
            for(let i = 0; i < this.callbacks.length; i++)
            {
                this.callbacks[i](this.getCurrentTimeSec());
            }
        }
    }

    getCurrentTimeSec()
    {
        return Math.round(this.currentTimeMS/1000);
    }

    getCurrentTimeString()
    {
        var timeObj = this.getTimeObj();
        var timeStr = this.timeToStr(timeObj.hours, timeObj.minutes, timeObj.seconds);
        return(timeStr)
    }

    getTimeObj()
    {
        let secondsElapsed = Math.round(this.currentTimeMS/1000);

        let minutesElapsed = Math.floor(secondsElapsed/60);
        let hours = Math.floor(secondsElapsed/3600);
        let seconds = secondsElapsed % 60;
        let minutes = minutesElapsed % 60;

        return ({hours: hours, minutes: minutes, seconds: seconds});
    }

    timeToStr(hours, minutes, seconds)
    {
        let hoursStr = (hours >= 0 && hours < 10) ? "0" + hours : hours;
        let  minutesStr = (minutes >= 0 && minutes < 10) ? "0" + minutes : minutes;
        let  secondsStr = (seconds >= 0 && seconds < 10) ? "0" + seconds : seconds;

        return hoursStr + ":" + minutesStr + ":" + secondsStr;
    }

    printTimeStr(timeStr)
    {
        //console.log(timeStr);
    }
}