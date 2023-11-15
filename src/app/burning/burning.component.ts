import { Component, OnDestroy, OnInit } from '@angular/core'
import { SubscriptionTracker } from '../subscription-tracker/subscription-tracker'
import { Observable } from 'rxjs'
import { Select } from '@ngxs/store'
import { VisibilityInfo } from '../models/visibility-info'
import { VisibilityState } from 'app/states/visibility-state'

@Component({
  selector: 'app-burning',
  templateUrl: './burning.component.html',
  styleUrls: ['./burning.component.scss']
})
export class BurningComponent
    extends SubscriptionTracker
    implements OnInit, OnDestroy
{
    title: string = 'Burning'
    burning: number = 0
    @Select(VisibilityState.selectVisibilityInfo) getVisibilityInfo$: Observable<
        VisibilityInfo[]
    >
    constructor() {
        super()
    }

    ngOnInit(): void {
        this._track(
            this.getVisibilityInfo$.subscribe((data) => {
                if (data.length === 1) {
                    this.burning = data[0].burning
                }
            })
        )
    }

    ngOnDestroy(): void {
        super.ngOnDestroy()
    }
}