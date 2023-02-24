export class behaviours_statusMaster {
    public ID: number;
    public Name: string;
}
export class behaviours_status {
    public id: string;
    public status_type: string;
    public notes: string;
    public reasons: string;
    public lev_id: string;
    public class_id: string;
    public student_id: string;
}
export class behaviours_status_details {
    public ser: string;
    public behaviour_status_id: string;
    public student_id: string;
    public another_situations: string;
    public date: string;
    public efforts: string;
    public end_year_situation: string;
}