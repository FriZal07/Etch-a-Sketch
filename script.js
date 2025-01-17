let gridSize = 1;
let colorCurrentValue = "#515151";
let gridStatus = true;

let colorSelector = document.querySelector("#color_selector");
let gridSelector = document.querySelector("#grid_selector");
let gridCounter = document.querySelector("#grid_shower");
let resetGrid = document.querySelector("#reset");
let borderGrid = document.querySelector("#grid");

let mouseDown = false
document.body.onmousedown = () => {mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

colorSelector.addEventListener("change",(e)=> colorCurrentValue = e.target.value);
gridSelector.addEventListener("change",(e)=> {gridSize = e.target.value; GridChange(gridSize);});
resetGrid.addEventListener("click",()=> GridChange(gridSize) );
borderGrid.addEventListener("click", ()=> {
    if (gridStatus == true){gridline(false) }
    else{gridline(true) }
})


function colorBox(selectedBox){
    if (selectedBox.type === 'mouseover' && !mouseDown) return
    else{   
        selectedBox.target.style.backgroundColor = colorCurrentValue;
    }
}

function GridChange(newSize){

    let gridSquare = document.querySelector(".grid_screen");

    gridCounter.textContent = `${newSize}x${newSize}`;

    let GridPerc = (100/newSize) + "%";
    console.log(GridPerc);

    gridSquare.textContent = '';

    for (let i = 0; i < newSize*newSize; i++){

        let box = document.createElement("div");

        box.classList.add("boxes")
        box.style.flex = GridPerc ;
        box.setAttribute('ondragstart', 'dragstart(event)');

        box.addEventListener("mouseover",(e) => {colorBox(e)})
        box.addEventListener('mousedown',(e) => {colorBox(e)})

        gridSquare.appendChild(box);
    }

    if (gridStatus == false) gridline(false);

}


function gridline(futurestatus){

    if (futurestatus == false){

    gridStatus = false;
    let gridBoxes = document.querySelectorAll(".boxes")

    gridBoxes.forEach(el => {
        el.style.border = 0;
    });

    borderGrid.textContent = "Enable Grid";
    }

    else{
        
    let gridBoxes = document.querySelectorAll(".boxes")

    gridStatus = true;
    gridBoxes.forEach(el => {
        el.style.border = "solid 1px #1F2937";
    });

    borderGrid.textContent = "Disable Grid";
    }
    
}

function dragstart(event){
    event.preventDefault();
}

GridChange(gridSize);
