(() => {
    const checkBoxes1 = document.querySelectorAll('.checkButton');
    const content = document.querySelectorAll('.task1');
    const progressLabel = document.querySelector('.p1');
    const goals = document.querySelectorAll('.p2');
    const progressBar = document.querySelector('.insideProgressBar');
    let completedTasks = 0;

    const allQuotes = [
        'Raise the bar by completing your goals!',
        'Well begun is half done!',
        'Just a step away, keep going!',
        'Whoa! You just completed all the goals, time for chill :D'
    ];

    let allObject = JSON.parse(localStorage.getItem('allGoals')) || {};
    let completedGoalsCount = Object.values(allObject).filter(goal => goal.completed).length;
    
    progressLabel.innerHTML = allQuotes[Math.min(completedGoalsCount, allQuotes.length - 1)];

    const updateGoalsMessage = () => {
        const allFilled = Array.from(content).every(input => input.value.trim().length > 0);
        goals.forEach(goal => goal.style.visibility = allFilled ? 'hidden' : 'visible');
        localStorage.setItem('goalsMessageHidden', allFilled);
    };

    window.addEventListener('load', () => {
        const isHidden = localStorage.getItem('goalsMessageHidden') === 'true';
        goals.forEach(goal => goal.style.visibility = isHidden ? 'hidden' : 'visible');

        allObject = JSON.parse(localStorage.getItem('allGoals')) || {};
        
        completedTasks = Object.values(allObject).filter(goal => goal.completed).length;
        completedGoalsCount = completedTasks; 
        progressLabel.innerHTML = allQuotes[Math.min(completedGoalsCount, allQuotes.length - 1)];

        document.querySelectorAll('.task1').forEach((input) => {
            const checkBox = input.parentElement.querySelector('.checkButton');
            const taskBar = input.closest('.taskBar');

            if (allObject[input.id] && allObject[input.id].completed) {
                checkBox.classList.add('checkButton1');
                taskBar.classList.add('complete');
            }
        });

        updateProgressBar();
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
            const inputId = checkBox.nextElementSibling.id;

            if (!allObject[inputId]) {
                allObject[inputId] = { name: taskInput.value, completed: false };
            }

           
            if (taskInput.value.trim().length === 0) return;

            allObject[inputId].completed = !allObject[inputId].completed;
            localStorage.setItem('allGoals', JSON.stringify(allObject));

            checkBox.classList.toggle('checkButton1');
            taskBar.classList.toggle('complete');

            if (checkBox.classList.contains('checkButton1')) {
                completedGoalsCount++;
                completedTasks++;
            } else {
                completedGoalsCount--;
                completedTasks--;
            }

            progressLabel.innerHTML = allQuotes[Math.min(completedGoalsCount, allQuotes.length - 1)];
            updateProgressBar();
        });
    });

    content.forEach((input) => {
        if (!allObject[input.id]) {
            allObject[input.id] = { name: "", completed: false };
        }

        input.value = allObject[input.id].name;

        const checkBox = input.parentElement.querySelector('.checkButton');
        const taskBar = input.closest('.taskBar');
        if (allObject[input.id].completed) {
            checkBox.classList.add('checkButton1');
            taskBar.classList.add('complete');
        }

        input.addEventListener('input', (e) => {
            allObject[input.id].name = input.value;
            localStorage.setItem('allGoals', JSON.stringify(allObject));
        });
    });

    content.forEach((input) => {
        input.addEventListener('input', () => {
            const taskBar = input.closest('.taskBar');
            const checkBox = taskBar.querySelector('.checkButton');
            const inputId = input.id;

           
            if (input.value.trim().length === 0 && allObject[inputId].completed) {
                checkBox.classList.remove('checkButton1');
                taskBar.classList.remove('complete');
                completedTasks--;
                completedGoalsCount--;
                allObject[inputId].completed = false;
                localStorage.setItem('allGoals', JSON.stringify(allObject));
            }

            progressLabel.innerHTML = allQuotes[Math.min(completedGoalsCount, allQuotes.length - 1)];
            updateProgressBar();
        });
    });
})();

