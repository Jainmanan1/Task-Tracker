(() => {
    const checkBoxes1 = document.querySelectorAll('.checkButton');
    const content = document.querySelectorAll('.task1');
    const goals = document.querySelectorAll('.p2');
    const progressBar = document.querySelector('.insideProgressBar');
    let completedTasks = 0;
   

    const allObject= JSON.parse(localStorage.getItem('allGoals')) || {};

   const updateGoalsMessage = () =>{
        const allFilled = Array.from(content).every(input => input.value.trim().length > 0);
        goals.forEach(goal => goal.style.visibility = allFilled ? 'hidden' : 'visible');
        localStorage.setItem('goalsMessageHidden' , allFilled);
   };
 window.addEventListener('load',()=>{
    const isHidden= localStorage.getItem('goalsMessageHidden')==='true';
   goals.forEach(goal => goal.style.visibility = isHidden ? 'hidden' : 'visible');
    });

    content.forEach((input) => {
        input.addEventListener('input', updateGoalsMessage);
    });


    const updateProgressBar = () => {
        const progressPercentage = (completedTasks / checkBoxes1.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.style.background = progressPercentage > 0 ? '#48A300' : '';
    };

    checkBoxes1.forEach((checkBox) => {
        checkBox.addEventListener('click', () => {
            const taskBar = checkBox.closest('.taskBar');
            const taskInput = taskBar.querySelector('.task1');
            const inputId= checkBox.nextElementSibling.id;
            allObject[inputId].completed= !allObject[inputId].completed;
            localStorage.setItem('allGoals',JSON.stringify(allObject));
            
            if (taskInput.value.trim().length > 0) {
                
                checkBox.classList.toggle('checkButton1');
                taskBar.classList.toggle('complete');

                
                if (checkBox.classList.contains('checkButton1')) {
                    completedTasks++;
                } else {
                    completedTasks--;
                }
            } else {
                
                checkBox.classList.remove('checkButton1');
                taskBar.classList.remove('complete');
            }

           
            updateProgressBar();


        });
    });

    content.forEach((input) => {
       
        if (!allObject[input.id]) {
            allObject[input.id] = { name: "", completed: false };
        }
    
       
        input.value = allObject[input.id].name;
    
        const checkBox = input.parentElement.querySelector('.checkButton');
        if (allObject[input.id].completed) {
            checkBox.classList.add('checkButton1');
            input.parentElement.classList.add('complete');
        }
        
        input.addEventListener('input', (e) => {
            allObject[input.id] = {
                name: input.value,
                completed: false,
            };
            localStorage.setItem('allGoals', JSON.stringify(allObject));
        });
    });
    
    
    

    
    content.forEach((input) => {
        input.addEventListener('input', () => {
            const taskBar = input.closest('.taskBar');
            const checkBox = taskBar.querySelector('.checkButton');

            if (input.value.trim().length === 0) {
                
                if (checkBox.classList.contains('checkButton1')) {
                    checkBox.classList.remove('checkButton1');
                    taskBar.classList.remove('complete');
                    completedTasks--; 
                }
            }

           
            const allFilled = Array.from(content).every(input => input.value.trim().length > 0);
            goals.forEach(goal => goal.style.visibility = allFilled ? 'hidden' : 'visible');

            updateProgressBar();
        });
    });
})();



