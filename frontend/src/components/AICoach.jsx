const AICoach = ({ calories, protein, goal}) => {
    const remainingProtein = Math.max(goal-protein, 0);
    const message = calories > 2200 ? 
    `You've exceeded your calorie threshold. Consider some lighter meals.` :
    `You can still eat more today.`;
    return (
        <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded">
            <h3>AI Coach Suggestions</h3>
            <p>{message}</p>
            <p>{remainingProtein >0 ? 
            `Try to eat ${remainingProtein}g more protein to reach your goal.` :
            `You've hit your protein target for today. Great job!`}</p>
        </div>
    )
}

export default AICoach;