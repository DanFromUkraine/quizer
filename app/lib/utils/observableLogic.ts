type DataRequestListener<> = () => {};

export class Observable<DataType extends NonNullable<unknown>> {
  private listeners: {
    listenerBody: (arg1: DataType) => void;
    listenerName: string;
  }[];
  private data: DataType | null;

  constructor(dataPromise: Promise<DataType>) {
    this.listeners = [];
    this.data = null;
    this.initiateData(dataPromise);
  }

  private initiateData(dataPromise: Promise<DataType>) {
    dataPromise.then((newData) => {
      this.updateData(newData);
    });
  }

  private updateData(newData: DataType) {
    if (this.data === null) {
      this.data = newData;
      this.notifyListeners();
    } else {
      console.warn("Data in Observable already initiated!");
    }
  }

  private notifyListeners() {
    if (this.data !== null) {
      this.listeners.forEach(({ listenerBody }) => {
        listenerBody(this.data!);
      });
      this.listeners = [];
    } else {
      console.warn("Was asked to notify listeners, but data is null");
    }
  }

  requestData(name: string, callback: (arg1: DataType) => void) {
    if (this.data !== null) {
      callback(this.data);
    } else {
      this.deleteRequestData(name);
      this.listeners.push({
        listenerName: name,
        listenerBody: callback,
      });
    }
  }

  deleteRequestData(listenerName: string) {
    console.warn("before", this.listeners.length);
    this.listeners = this.listeners.filter((prevCallback, i, arr) => {
      return prevCallback.listenerName !== listenerName;
    });
    console.warn("after", this.listeners.length);
  }
}
