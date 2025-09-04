type DataRequestListener<DataType> = (arg: DataType) => void;

export class Observable<DataType extends NonNullable<unknown>> {
        private listeners: {
                listenerBody: DataRequestListener<DataType>;
                listenerName: string;
        }[];
        private data: DataType | null;

        constructor(dataPromise: Promise<DataType>) {
                this.listeners = [];
                this.data = null;
                this.initiateData(dataPromise);
        }

        requestData(name: string, callback: DataRequestListener<DataType>) {
                if (this.data !== null) {
                        callback(this.data);
                } else {
                        this.deleteRequestData(name);
                        this.listeners.push({
                                listenerName: name,
                                listenerBody: callback
                        });
                }
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
                        console.warn('Data in Observable already initiated!');
                }
        }

        private notifyListeners() {
                if (this.data !== null) {
                        this.listeners.forEach(({ listenerBody }) => {
                                listenerBody(this.data!);
                        });
                        this.listeners = [];
                } else {
                        console.warn(
                                'Was asked to notify listeners, but data is null'
                        );
                }
        }

        private deleteRequestData(listenerName: string) {
                this.listeners = this.listeners.filter(
                        (prevCallback, i, arr) => {
                                return (
                                        prevCallback.listenerName !==
                                        listenerName
                                );
                        }
                );
                console.warn('after', this.listeners.length);
        }
}
