

export class DestinoViajes {
    selected: boolean = false; 
    public servicios: string[] = ['pasajes', 'alojamiento', 'traslados', 'tours'];
    id = crypto.randomUUID()
    public votes: number = 0;
    constructor(public nombre: string, public imagenUrl: string) {}   
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s: boolean) {
        this.selected = s;
    }
    voteUp(): any {
        this.votes++;
    }
    voteDown(): any {
        this.votes--;
    }

}