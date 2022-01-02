const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mustBeSignedIn: this.state.mustBeSignedIn,
//name: this.state.name,
//questions: this.state.questions,
//category: this.state.categoryVal

const QuizSchema = new Schema({
    mustBeSignedIn: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    questions: [{
        type: Object,
        contains: {
            answers: {type: Array},
            correctAnswer: String,
            questionName: String
        }
    }],
    category: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: false
    },
    comments: [{
        type: Object,
        contains: {
            sentFromId: {type: Schema.Types.ObjectID},
            message: {type: String}
        }
    }],
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: Schema.Types.ObjectID,
        required: true
    },
    scores: {type: Array, default: []},
    createdAt: {
        type: Date,
        default: new Date()
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = User = mongoose.model('Quizzes', QuizSchema);
