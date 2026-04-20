export class BaseComponentInstanceService<T extends object> {
  private instance: T | undefined;
  private instanceCreated = false;
  public setInstance(instance: T): void {
    if (!this.instanceCreated) {
      this.instance = instance;
      this.instanceCreated = true;
    } else {
      if (instance) {
        console.warn(
          `Instance of ${this.instance ? this.instance.constructor.name : 'undefined'} already created, replacing with new instance.`,
        );
        this.instance = instance;
      }
    }
  }

  public getInstance(): T | undefined {
    if (this.instanceCreated) {
      return this.instance;
    } else {
      console.warn('Instance not created yet.');
      return undefined;
    }
  }
}
