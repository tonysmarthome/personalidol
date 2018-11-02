// @flow

import Collection from '../../classes/Collection';
import CommandBus from '../../classes/CommandBus';
import Entity from '../Entity';
import ForgetMemorizable from '../../classes/Command/ForgetMemorizable';
import HearMessage from '../../classes/Command/HearMessage';
import LearnMemorizable from '../../classes/Command/LearnMemorizable';
import TellMessage from '../../classes/Command/TellMessage';
import { default as AimCommand } from '../../classes/Command/Aim';

import type { Aimable } from '../../domaininterfaces/Memorizable/Aimable';
import type { Aims } from '../../domaininterfaces/Sentient/Aims';
import type { Hears } from '../../domaininterfaces/Sentient/Perceives/Hears';
import type { Memorizable } from '../../domaininterfaces/Memorizable';
import type { Memorizes } from '../../domaininterfaces/Sentient/Perceives/Memorizes';
import type { Message } from '../../domaininterfaces/Perceivable/Message';
import type { Perceives } from '../../domaininterfaces/Sentient/Perceives';
import type { Sees } from '../../domaininterfaces/Sentient/Perceives/Sees';
import type { Speaks } from '../../domaininterfaces/Sentient/Speaks';
import type { Vocal } from '../../domaininterfaces/Perceivable/Message/Vocal';

export default class Character extends Entity implements Aims, Hears, Memorizes, Sees, Speaks {
  commandBus: CommandBus;
  memorized: Collection<Memorizable>;

  aim(aimable: Aimable): void {
    this.commandBus.source(new AimCommand(this, aimable));
  }

  forget(memorizable: Memorizable): void {
    this.commandBus.source(new ForgetMemorizable(this, memorizable));
  }

  hear(message: Vocal): void {
    this.commandBus.source(new HearMessage(this, message));
  }

  knows(memorizable: Memorizable): boolean {
    return this.memorized.contains(memorizable);
  }

  learn(memorizable: Memorizable): void {
    this.commandBus.source(new LearnMemorizable(this, memorizable));
  }

  tell(beings: Array<Perceives>, message: Message): void {
    for (let being of beings) {
      this.commandBus.source(new TellMessage(being, message));
    }
  }
}
