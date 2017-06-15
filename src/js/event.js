// @flow
import { bindThis } from './util';

import type Store from './store';
import type UiStore from './store/ui';
import type RecordStore from './store/record';

// TODO: mock
const storage = localStorage;


class Event {
  ui: UiStore;
  record: RecordStore;

  constructor({
    ui,
    record,
  }: Store) {
    bindThis(this);

    this.ui = ui;
    this.record = record;
  }

  onClickOpenAddLogModal(): void {
    this.ui.setAddLogModalOpen(true);
  }
  onClickCloseAddLogModal(): void {
    this.ui.setAddLogModalOpen(false);
  }

  onClickAddLog(log: LogSeed): void {
    this.record.add(log);
  }

  onClickModLog(log: Log): void {
    this.ui.setModLog(log);
    this.ui.setModLogModalOpen(true);
  }
  onClickCloseModLogModal(): void {
    this.ui.setModLogModalOpen(false);
  }

  onClickDelLog(log: Log): void {
    const check = window.confirm('TODO: 取り消せません');
    if (check) {
      this.record.del(log);
    }
  }

  onClickResetAll(): void {
    const check = window.confirm('TODO: 取り消せません');
    if (check) {
      storage.clear();
      location.reload(true);
    }
  }
}

export default Event;
