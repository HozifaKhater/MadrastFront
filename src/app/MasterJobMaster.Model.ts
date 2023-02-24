export class MasterJobMaster {
    public ID: number;
    public Name: string;
}
export class MasterJob {
    public job_id: number;
    public job_name: string;
    public job_desc: string;
    public in_class_priv: number;
    public dep_work: number;
}
export class MasterJobdetails {
    public priv_id: number;
    public priv_name: string;
}
export class privs {
    public priv_id: number;
    public priv_name: string;
    public checked: boolean;
}