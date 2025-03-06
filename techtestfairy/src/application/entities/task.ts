export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public status: 'pending' | 'in_progress' | 'completed', // Usando status
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) { }

  static create(title: string, description?: string): Task {
    return new Task(
      crypto.randomUUID(),
      title,
      description || null,
      'pending',
      new Date(),
      new Date(),
    );
  }

  updateStatus(newStatus: 'pending' | 'in_progress' | 'completed') {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}
