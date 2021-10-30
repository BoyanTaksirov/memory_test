import {ProgressBarBlockType} from "./progress_bar_block_type";

function ProgressBar(parentContainer)
{
    this.parentContainer = parentContainer;
    this.container = document.createElement("div");
    this.parentContainer.appendChild(this.container);

    this.outerDiv = document.createElement("div");
    this.outerDiv.className = "preloaderOuter";

    this.innerDiv = document.createElement("div");
    this.innerDiv.className = "preloaderInner";

    this.outerDiv.appendChild(this.innerDiv);

    this.container.appendChild(this.outerDiv);
}

ProgressBar.prototype.updateProgressBar = function (progress)
{
    this.innerDiv.style.width = progress + "%";
}

export function PreloaderBlock(parentContainer, initialSize, onClickedCallback)
{
    this.parentContainer = parentContainer;
    if (onClickedCallback)
    {
        this.onClickedCallback = onClickedCallback;
    }

    this.removePreloader = this.removePreloader.bind(this);

    this.removePreloaderAndClearAll = this.removePreloaderAndClearAll.bind(this);

    this.updatePreloader = this.updatePreloader.bind(this);

    this.container = document.createElement("div");
    this.container.className = "preloaderBlockBkg";

    this.progressBarBlock = new ProgressBarBlockType(this.container, initialSize);
    this.progressBarBlock.addToContainer();

    this.container.addEventListener("click", this.onClicked.bind(this));

    this.label = document.createElement("div");
    this.label.className = "preloaderBlockLabel";

    this.container.appendChild(this.label);

    this.progressBar = new ProgressBar(this.container);

    this.updatePreloader(0);
}

PreloaderBlock.prototype.setZIndex = function (zIndex)
{
    this.container.style.zIndex = zIndex;
}

PreloaderBlock.prototype.updatePreloader = function (progress)
{
    var progresRounded = Math.round(progress);
    this.label.innerText = progresRounded + "%";
    this.progressBar.updateProgressBar(progress);
    this.progressBarBlock.updateProgressBar(progress);
}

PreloaderBlock.prototype.onClicked = function (e)
{
    if (this.onClickedCallback)
    {
        this.onClickedCallback();
    }
}

PreloaderBlock.prototype.addToContainer = function ()
{
    if (!this.container.parentNode)
    {
        this.parentContainer.appendChild(this.container);
    }
}

PreloaderBlock.prototype.removeFromContainer = function ()
{
    this.parentContainer.removeChild(this.container);
}

PreloaderBlock.prototype.resetPreloader = function ()
{
    this.label.innerText = 0 + "%";
    this.progressBar.updateProgressBar(0);

}

PreloaderBlock.prototype.removePreloader = function ()
{
    this.container.removeEventListener("click", this.onClicked);
    this.container.addEventListener("animationend", this.removePreloaderAndClearAll);
    this.container.style.animation = "preloaderFadeOut 0.5s forwards";
}

PreloaderBlock.prototype.removePreloaderAndClearAll = function()
{
    this.container.removeEventListener("animationend", this.removePreloaderAndClearAll);
    this.removeFromContainer();
}
