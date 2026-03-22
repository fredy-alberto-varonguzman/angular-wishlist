

export class DestinoViajes {
    private selected!: boolean;
    public servicios: string[] = ['pasajes', 'alojamiento', 'traslados', 'tours'];
    id = crypto.randomUUID()
    constructor(public nombre: string, public imagenUrl: string) {}   
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s: boolean) {
        this.selected = s;
    }
}