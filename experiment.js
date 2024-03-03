document.addEventListener('DOMContentLoaded',()=>{
    const container = document.getElementById('experimentContainer');
    const startScreen = document.getElementById('startScreen');
    const trialScreen = document.getElementById('trialScreen');
    const completionScreen = document.getElementById('completionScreen');
    const leftSquare = document.getElementById('leftSquare');
    const rightSquare = document.getElementById('rightSquare');
    const trialEndScreen= document.getElementById('trialEndScreen');
    let trialsData = {};
    let difficultylevelTrialData = {};
    let trialCount = 0;
    let clickCount = 0;
    let startTime = 0;
    let endTime = 0;
    const totalTrials = 150;
    const clicksPerTrial = 10;
    currentTrial = 1;

    //difficulty IDS and index
    const IDS = [2,3,4,5,6];
    let currentIDIndex = 0;
    let wxdist = ((1/(2**IDS[currentIDIndex])-1));; 
    let widthDistanceCombinations = [
        {width:25, distance:wxdist*25},
        {width:20, distance:wxdist*20},
        {width:15, distance:wxdist*15},
    ];
       
       
    let currentCombinationIndex = 0;

    startScreen.addEventListener('click',()=>{
        startScreen.style.display = 'none';
        trialScreen.style.display = 'flex';
        setupTrial();
    });

    completionScreen.addEventListener('click',()=>{
        completionScreen.style.display = 'none';
        startScreen.style.display = 'flex';
    })

    function setupTrial(){
        
        if(currentIDIndex<IDS.length){
            wxdist = ((2**IDS[currentIDIndex])-1);
            widthDistanceCombinations = [
                {width:40, distance:wxdist*40},
                {width:30, distance:wxdist*30},
                {width:15, distance:wxdist*15},
            ];
               
            
            
            const {width, distance} = widthDistanceCombinations[currentCombinationIndex];
            prepareTargets(width, distance);
            currentTrial = `${IDS[currentIDIndex]}-${currentCombinationIndex+1}`;
            trialsData[currentTrial] = [];
        }else{
            showResults();
        }
    }

    function prepareTargets(width, distance){
        leftSquare.style.width = `${width}px`;
        rightSquare.style.width = `${width}px`;
        leftSquare.style.height = `${width}px`;
        rightSquare.style.height = `${width}px`;
        leftSquare.style.left = `calc(50% - ${distance/2}px - ${width}px)`;
        rightSquare.style.left = `calc(50% + ${distance/2}px)`;

        //adding event listeners to the squares
        clickCount = 0;
        attachEventListeners();
    }

    function attachEventListeners(){
        const targets = [leftSquare, rightSquare];
        targets.forEach((target)=>{
            target.addEventListener('click',handleTargetClick);
            console.log('event listener added');
        })
    }
    function handleTargetClick(){
        if (clickCount === 0){
            startTime = performance.now();
        }else{
            endTime = performance.now();
            const timeTaken = endTime - startTime;
            trialsData[currentTrial].push(timeTaken);
            startTime = performance.now();
            if(trialsData[currentTrial].length === clicksPerTrial){
                finalizeTrial();
                return;
            }
        }
        clickCount++;
    }

    function finalizeTrial(){
        currentCombinationIndex++;
        if(currentCombinationIndex >= widthDistanceCombinations.length){
            currentCombinationIndex = 0;
            currentIDIndex++;
        }
        setupTrial();
    }
    
    function showResults(){
        console.log(trialsData);
        trialScreen.style.display = 'none';
        completionScreen.style.display = 'flex';
        alert('Experiment Completed!')
        trialCount = 0;
        clickCount=0;
        startTime = 0;
        endTime = 0;    
    }
 
}); 