import { Component, OnInit, Input } from "@angular/core";
import * as io from "socket.io-client";
// import io from "socket.io-client";
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html"
})
export class AboutComponent implements OnInit {
  private url = "http://localhost:3000";
  private socket;
  @Input() progress = "10";
  constructor() {}
  ngOnInit(): void {
    this.socket = io(this.url);
    console.log(io, this.socket.connect(), this.socket);
    this.progress = "20";
    this.socket.on("progress", _ => {
      const newProgress = parseInt(this.progress, 10) + 10;
      this.progress = newProgress.toString();
    });
  }
}
