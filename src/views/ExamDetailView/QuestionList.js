import React, { PropTypes } from 'react';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import compose from 'recompose/compose';
import Question from 'components/Question';

const QuestionList = compose(
  setPropTypes({
    question: PropTypes.object.isRequired,
    examId: PropTypes.string.isRequired
  }),
  setDisplayName('QuestionList')
)(({ question, examId }) => {
  examId = parseInt(examId);

  return (
    <div>
      {
        question.get('result').map((uuid) => (
          <Question key={ uuid } examId={ examId } uuid={ uuid } />
        ))
      }
    </div>
  );
});

export default QuestionList;