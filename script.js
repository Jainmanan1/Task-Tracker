(() => {
    const checkBoxes1 = document.querySelectorAll('.checkButton');
    const content = document.querySelectorAll('.task1');
    const goals = document.querySelectorAll('.p2');
    const progressBar = document.querySelector('.insideProgressBar');

    const allQuotes =['Raise the bar by completing your goals!',
        'Well begun is half done!',
        'Just a step away, keep going!',
'Whoa! You just completed all the goals, time for chill :D']

    const allObject = JSON.parse(localStorage.getItem('allGoals')) || {};

    
    let completedTasks = Object.values(allObject).filter(goal => goal.completed).length;

   
    const updateProgressBar = () => {
        const progressPercentage = (completedTasks / checkBoxes1.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.style.background = progressPercentage > 0 ? '#48A300' : '';
    };

 
    checkBoxes1.forEach((checkBox) => {
        const taskBar = checkBox.closest('.taskBar');
        const taskInput = taskBar.querySelector('.task1');
        const inputId = taskInput.id;

        if (!allObject[inputId]) {
            allObject[inputId] = { name: "", completed: false };
        }

        taskInput.value = allObject[inputId].name;

        if (allObject[inputId].completed) {
            checkBox.classList.add('checkButton1');
            taskBar.classList.add('complete');
        }

        checkBox.addEventListener('click', () => {
            allObject[inputId].completed = !allObject[inputId].completed;
            localStorage.setItem('allGoals', JSON.stringify(allObject));

            checkBox.classList.toggle('checkButton1');
            taskBar.classList.toggle('complete');

            completedTasks = Object.values(allObject).filter(goal => goal.completed).length;
            updateProgressBar();
        });
    });

   
    updateProgressBar();

   
    const updateGoalsMessage = () => {
        const allFilled = Array.from(content).every(input => input.value.trim().length > 0);
        goals.forEach(goal => goal.style.visibility = allFilled ? 'hidden' : 'visible');
        localStorage.setItem('goalsMessageHidden', allFilled);
    };

    window.addEventListener('load', () => {
        const isHidden = localStorage.getItem('goalsMessageHidden') === 'true';
        goals.forEach(goal => goal.style.visibility = isHidden ? 'hidden' : 'visible');
    });


    content.forEach((input) => {
        input.addEventListener('input', () => {
            const taskBar = input.closest('.taskBar');
            const checkBox = taskBar.querySelector('.checkButton');

            allObject[input.id] = {
                name: input.value,
                completed: allObject[input.id]?.completed || false,
            };
            localStorage.setItem('allGoals', JSON.stringify(allObject));

            if (input.value.trim().length === 0) {
                checkBox.classList.remove('checkButton1');
                taskBar.classList.remove('complete');
                completedTasks = Object.values(allObject).filter(goal => goal.completed).length;
                updateProgressBar();
            }

            updateGoalsMessage();
        });
    });
})();
