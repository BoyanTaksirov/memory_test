export function ProgressBarBlockType(_parentContainer, initialSize)
{
    this.parentContainer = _parentContainer;

    this.resize = this.resize.bind(this)

    this.currentProgressPercent = 0;
    this.ACTIVE = false;

    this.container = document.createElement("div");
    this.container.className = "progressBarBT_CCSS";

    this.updateProgressBar = this.updateProgressBar.bind(this);

    this.blockInitArray = new Array();
    this.blockInitArray[0] = new Array();

    this.blockInitArray[0][0] =  "*--***--*--**--*-**-*";
    this.blockInitArray[0][1] =  "-*-*-*--*--*-*-*--***";
    this.blockInitArray[0][2] =  "-*-*----**-*-*--*-*-*";
    this.blockInitArray[0][3] =  "*--*-*--*--**--*-*-*-";
    this.blockInitArray[0][4] =  "*-*--*--*--*-*-----**";
    this.blockInitArray[0][5] =  "*-*-***-*--*-*--**--*";
    this.blockInitArray[0][6] =  "*-*--*-*--*-*-*--*--*";
    this.blockInitArray[0][7] =  "*-*-*--***--*-*--*---";
    this.blockInitArray[0][8] =  "*-*-*--***--*-***-***";
    this.blockInitArray[0][9] =  "*-*-*--**--*--***--*-";
    this.blockInitArray[0][10] = "*-*-*---*--**---*--**";
    this.blockInitArray[0][11] = "*---*---*--**-**---*-";

    this.coordinatesArray = new Array();
    this.blockArray = new Array();

    this.horizontalBlocksCount = 0;
    this.verticalBlocksCount = 0;

    this.toggleVisibility(false);

    this.setDimensions(initialSize);
    this.createBlocks();

    window.addEventListener("resize", this.resize.bind(this));
}

ProgressBarBlockType.prototype.setZIndex = function(value)
{
    this.container.style.zIndex = value;
}

ProgressBarBlockType.prototype.resize = function (e)
{
    this.setDimensions();
    this.resizeReal();
}

ProgressBarBlockType.prototype.setDimensions = function (initialSize)
{
    var size = this.parentContainer.clientWidth * ProgressBarBlockType.SIZE_COEF;
    var gap = Math.round(this.parentContainer.clientWidth * ProgressBarBlockType.GAP_COEF);

    if(initialSize)
    {
        size = initialSize.width* ProgressBarBlockType.SIZE_COEF;
        gap = Math.round(initialSize.width * ProgressBarBlockType.GAP_COEF);
    }

    if(size > window.innerHeight*0.05)
    {
        size = window.innerHeight*0.05;
        gap =  window.innerHeight*0.01;
    }

    this.blockWidth = size;
    this.blockHeight = this.blockWidth;
    this.gap = gap;

    this.container.style.width = this.blockInitArray[0][0].length*(this.blockWidth + this.gap) + "px"
    this.container.style.height = this.blockInitArray[0].length*(this.blockWidth + this.gap) + "px";

    this.getBlockCoordinates();
}

ProgressBarBlockType.prototype.resizeReal = function ()
{
    for (var i = 0; i < this.blockArray.length; i++)
    {
        this.blockArray[i].resize(this.blockWidth, this.blockHeight);
        this.blockArray[i].setPosXY(this.coordinatesArray[i].left, this.coordinatesArray[i].top);
    }
}

ProgressBarBlockType.prototype.getBlockCoordinates = function ()
{
    this.horizontalBlocksCount = this.blockInitArray[0][0].length;
    this.verticalBlocksCount = this.blockInitArray[0].length;

    this.coordinatesArray = new Array();
    for (var row = this.blockInitArray[0].length - 1; row >= 0; row--)
    {
        for (var column = 0; column < this.blockInitArray[0][0].length; column++)
        {
            if (this.blockInitArray[0][row].charAt(column) === "*")
            {
                var coordX = column * (this.blockWidth + this.gap);
                var coordY = row * (this.blockHeight + this.gap);
                var coordsXY = { left: coordX, top: coordY };
                this.coordinatesArray.push(coordsXY);
            }
        }
    }
}

ProgressBarBlockType.prototype.createBlocks = function ()
{
    for (var i = 0; i < this.coordinatesArray.length; i++)
    {
        var tempBlock = new ProgressBarBlock(this.coordinatesArray[i].left, this.coordinatesArray[i].top, this.blockWidth, this.blockHeight, this.container);
        this.blockArray.push(tempBlock);
    }
}

ProgressBarBlockType.prototype.addToContainer = function ()
{
    if (!this.container.parentNode)
    {
        this.parentContainer.appendChild(this.container);
    }
}

ProgressBarBlockType.prototype.removeFromContainer = function ()
{
    window.removeEventListener("resize", this.resize);
    if (this.container.parentNode)
    {
        this.parentContainer.removeChild(this.container);
    }
}

ProgressBarBlockType.prototype.updateProgressBar = function (_progress)
{
    this.currentProgressPercent = _progress;
    var activeBlocksCount = Math.floor(this.blockArray.length * (this.currentProgressPercent / 100));

    this.updateActiveBlocksCount(activeBlocksCount);
}

ProgressBarBlockType.prototype.updateActiveBlocksCount = function (_activeBlocksCount)
{
    for (var i = 0; i < this.blockArray.length; i++)
    {
        if (i < _activeBlocksCount)
        {
            this.blockArray[i].setActive();
        }
        else
        {
            this.blockArray[i].setInactive();
        }
    }
}

ProgressBarBlockType.prototype.setXYPos = function (_left, _top)
{
    this.container.style.left = _left + "px";
    this.container.style.top = _top + "px";
}

ProgressBarBlockType.prototype.toggleVisibility = function (_visible)
{
    if (_visible)
    {
        this.addToContainer();
        this.ACTIVE = true;
    }
    else
    {
        this.removeFromContainer();
        this.ACTIVE = false;
    }
}

ProgressBarBlockType.prototype.getWidth = function ()
{
    return this.horizontalBlocksCount * (this.blockWidth + this.gap);
}

ProgressBarBlockType.prototype.getHeight = function ()
{
    return this.verticalBlocksCount * (this.blockHeight + this.gap);
}

ProgressBarBlockType.SIZE_COEF = 0.035;
ProgressBarBlockType.GAP_COEF = 0;

function ProgressBarBlock(_left, _top, _width, _height, _parentContainer) {
    this.parentContainer = _parentContainer;

    this.block = document.createElement("div");
    this.block.className = "progressBarBT_Block_Inactive_CCSS";

    this.setPosXY(_left, _top);
    this.resize(_width, _height);

    this.addToContainer();
}

ProgressBarBlock.prototype.setActive = function () {
    this.block.className = "progressBarBT_Block_Active_CCSS";
}

ProgressBarBlock.prototype.setInactive = function () {
    this.block.className = "progressBarBT_Block_Inactive_CCSS";
}

ProgressBarBlock.prototype.addToContainer = function () {
    this.parentContainer.appendChild(this.block);
}

ProgressBarBlock.prototype.setPosXY = function (_left, _top) {
    this.block.style.left = _left + "px";
    this.block.style.top = _top + "px";
}

ProgressBarBlock.prototype.resize = function (_width, _height) {
    this.block.style.width = _width + "px";
    this.block.style.height = _height + "px";
}
