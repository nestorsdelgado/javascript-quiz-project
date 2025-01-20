class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)

    constructor(questions, timeLimit, timeRemaining) {

        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    // Methods
    
    getQuestion() {

        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {

        this.currentQuestionIndex++
    }

    shuffleQuestions(){

        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(answer){

        // questions -> array de Questions(la otra clase) -> cuyo tercer index es la respuesta
        // si answer = correcta

        if(this.questions.answer == this.answer) {
            this.correctAnswers++
        }
    }

    hasEnded(){

        if(this.currentQuestionIndex < this.questions.length) {
            return false
        } else {
            return true
        }
    }

}