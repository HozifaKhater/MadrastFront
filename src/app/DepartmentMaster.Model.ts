export class DepartmentMaster {
    public ID: number;
    public Name: string;
}
export class SideDepartmentMaster {
    public ID: number;
    public Name: string;
	public dep_id: string ;
	public dep_name: string ;
}
export class Departments {
	public dep_id: string ;
	public dep_name: string ;
	public dep_desc: string ;
	public dep_supervisor_id: string;
	public dep_supervisor_name: string;
}