import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Inset from 'layouts/Inset';
import ExamCard from 'components/ExamCard';
import Pagination from 'components/Pagination';

import { actions as examActions } from 'redux/modules/exam';

class ExamListView extends Component {
  componentDidMount() {
    const { query } = this.props.location;
    this.fetchExams(query);
  }

  componentWillReceiveProps(newProps) {
    const { query } = newProps.location;
    this.fetchExams(query);
  }

  fetchExams(query) {
    const page = parseInt(query.page) || 1;
    this.props.fetchExams({ page });
  }

  render() {
    const { exam } = this.props;
    const examData = exam.getIn(['entities', 'exam']);
    return (
      <div>
        <Inset>
          {
            exam.get('result').map((id, idx) => {
              return (
                <ExamCard
                  id={ id }
                  key={ idx }
                  name={ examData.getIn([`${id}`, 'name']) }
                  beganTime={ examData.getIn([`${id}`, 'began_at']) }
                  endedTime={ examData.getIn([`${id}`, 'ended_at']) }/>
              );
            })
          }
        </Inset>
        <Pagination
          baseUrl='/exams'
          current={ exam.get('page') }
          maxPage={ Math.ceil(exam.get('total') / 10) }/>
      </div>
    );
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    fetchExams: PropTypes.func.isRequired
  };
}

export default connect((state) => ({ exam: state.exam }),
  examActions)(ExamListView);
