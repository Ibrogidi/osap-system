export interface SurveyList{
    budget: string,
    description: string,
    expired_date: string,
    is_paid: boolean,
    required_number_of_respondent: number,
    requirements: Object,
    sections: any[],
    title: string,
}