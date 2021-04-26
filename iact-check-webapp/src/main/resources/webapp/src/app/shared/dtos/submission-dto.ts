import {RangeQuestionAnswerDTO} from "./range-question-answer-dto";

export interface SubmissionDTO {
  id?: number;
  correlatingCheckId: number;
  firstName: string;
  lastName: string;
  street: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  email: string;
  rangeQuestionAnswers: RangeQuestionAnswerDTO[];
}
