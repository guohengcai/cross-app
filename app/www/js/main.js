(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Task = /** @class */ (function () {
    function Task(taskname) {
        this.id = new Date().getTime().toString();
        this.name = taskname;
        this.status = false;
    }
    return Task;
}());
var DataStorage = /** @class */ (function () {
    function DataStorage() {
    }
    DataStorage.prototype.retrieve = function () {
    };
    DataStorage.prototype.store = function (tasks) {
    };
    return DataStorage;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager(arrayname) {
        this.tasks = arrayname;
    }
    TaskManager.prototype.add = function (task) {
        this.tasks.push(task);
    };
    TaskManager.prototype.remove = function (id) {
        var index_to_remove = undefined;
        this.tasks.forEach(function (item, index) {
            if (item.id == id) {
                index_to_remove = index;
            }
        });
        if (index_to_remove !== undefined) {
            this.tasks.splice(index_to_remove, 1);
        }
    };
    TaskManager.prototype.changeStatus = function (id, callback) {
        this.tasks.forEach(function (task) {
            if (task.id === id) {
                if (task.status == false) {
                    task.status = true;
                    return;
                }
                else {
                    task.status = false;
                }
            }
        });
        callback();
        console.log(this.tasks);
    };
    return TaskManager;
}());
var Template = /** @class */ (function () {
    function Template() {
        //not being used right now
    }
    Template.prototype.populate = function (id, name, status) {
        var task = "<li id=\"" + id + "\" data-status=\"" + status + "\">\n                <div class=\"task-container\">\n                <div class=\"task-name\">" + name + "</div>\n                <div class=\"task-buttons\">\n                  <button type=\"button\" data-function=\"done\">&#x2714;</button>\n                  <button type=\"button\" data-function=\"delete\">&times;</button>\n                </div>\n                </div>\n            </li>";
        return task;
    };
    return Template;
}());
var ListView = /** @class */ (function () {
    function ListView(listid) {
        this.list = document.getElementById('task-list');
    }
    ListView.prototype.clear = function () {
        this.list.innerHTML = '';
    };
    ListView.prototype.render = function (items) {
        var _this = this;
        //clear the view
        //render array using template
        items.forEach(function (task) {
            var id = task.id;
            var name = task.name;
            var status = task.status.toString();
            var item = tasktemplate.populate(id, name, status);
            // convert our string to HTML Node
            var fragment = document.createRange().createContextualFragment(item);
            _this.list.appendChild(fragment);
        });
    };
    return ListView;
}());
//----INITIALISE CLASSES
//array to store tasks
var taskarray = [];
//Task Manager class, pass the task array
var taskmanager = new TaskManager(taskarray);
//list view
var listview = new ListView('task-list');
//task template
var tasktemplate = new Template();
//reference to form
var taskform = document.getElementById('task-form');
//add listener to form
taskform.addEventListener('submit', function (event) {
    event.preventDefault();
    var input = document.getElementById('task-input');
    var taskname = input.value;
    var task = new Task(taskname);
    taskmanager.add(task);
    taskform.reset();
    listview.clear();
    listview.render(taskarray);
});
//add listener to list
var listelement = document.getElementById('task-list');
//add listener to list
listelement.addEventListener('click', function (event) {
    console.log(event.target);
    var target = event.target;
    if (target.getAttribute('data-function') == 'done') {
        var id = target.getAttribute('id');
        taskmanager.changeStatus(id, function () {
            listview.clear();
            listview.render(taskarray);
        });
    }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9tYWluLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0lBSUUsY0FBWSxRQUFnQjtRQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNILFdBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQUVEO0lBQ0U7SUFFQSxDQUFDO0lBQ0QsOEJBQVEsR0FBUjtJQUVBLENBQUM7SUFDRCwyQkFBSyxHQUFMLFVBQU8sS0FBa0I7SUFFekIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFFRDtJQUVFLHFCQUFZLFNBQXNCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3pCLENBQUM7SUFDRCx5QkFBRyxHQUFILFVBQUksSUFBUztRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDRCw0QkFBTSxHQUFOLFVBQU8sRUFBUztRQUNkLElBQUksZUFBZSxHQUFVLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBRSxVQUFDLElBQVMsRUFBRSxLQUFZO1lBQzFDLElBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSyxFQUFFLEVBQUM7Z0JBQ2hCLGVBQWUsR0FBRyxLQUFLLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksZUFBZSxLQUFLLFNBQVMsRUFBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRSxlQUFlLEVBQUUsQ0FBQyxDQUFFLENBQUM7U0FDekM7SUFD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LElBQUksSUFBSSxHQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLFdBQVcsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixRQUFRLENBQUMsTUFBTSxDQUFFLFNBQVMsQ0FBRSxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBRUgsc0JBQXNCO0FBQ3RCLElBQU0sV0FBVyxHQUFlLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckUsc0JBQXNCO0FBQ3RCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFXO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLElBQUksTUFBTSxHQUE2QixLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3BELElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxNQUFNLEVBQUU7UUFDbEQsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBQztZQUMxQixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsUUFBUSxDQUFDLE1BQU0sQ0FBRSxTQUFTLENBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztLQUNKO0FBRUgsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjbGFzcyBUYXNre1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHN0YXR1czogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IodGFza25hbWU6IHN0cmluZyl7XG4gICAgdGhpcy5pZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5uYW1lID0gdGFza25hbWU7XG4gICAgdGhpcy5zdGF0dXMgPSBmYWxzZTtcbiAgfVxufVxuXG5jbGFzcyBEYXRhU3RvcmFnZXtcbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG4gIHJldHJpZXZlKCl7XG5cbiAgfVxuICBzdG9yZSggdGFza3M6QXJyYXkgPFRhc2s+ICl7XG5cbiAgfVxufVxuXG5jbGFzcyBUYXNrTWFuYWdlcntcbiAgdGFza3M6IEFycmF5PFRhc2s+O1xuICBjb25zdHJ1Y3RvcihhcnJheW5hbWU6IEFycmF5PFRhc2s+KXtcbiAgICB0aGlzLnRhc2tzID0gYXJyYXluYW1lO1xuICB9XG4gIGFkZCh0YXNrOlRhc2spe1xuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgfVxuICByZW1vdmUoaWQ6c3RyaW5nKXtcbiAgICBsZXQgaW5kZXhfdG9fcmVtb3ZlOm51bWJlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goIChpdGVtOlRhc2ssIGluZGV4Om51bWJlcikgPT4ge1xuICAgICAgaWYoaXRlbS5pZCAgPT0gaWQpe1xuICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiggaW5kZXhfdG9fcmVtb3ZlICE9PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy50YXNrcy5zcGxpY2UoIGluZGV4X3RvX3JlbW92ZSwgMSApO1xuICAgIH1cbiAgfVxuICBjaGFuZ2VTdGF0dXMoaWQ6c3RyaW5nLGNhbGxiYWNrKTp2b2lke1xuICAgIHRoaXMudGFza3MuZm9yRWFjaCggKHRhc2s6VGFzaykgPT4ge1xuICAgICAgaWYodGFzay5pZCAgPT09IGlkKXtcbiAgICAgICAgaWYoIHRhc2suc3RhdHVzID09IGZhbHNlICl7XG4gICAgICAgICAgdGFzay5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgIHRhc2suc3RhdHVzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBjYWxsYmFjaygpO1xuICAgIGNvbnNvbGUubG9nKCB0aGlzLnRhc2tzICk7XG4gIH1cblxufVxuXG5jbGFzcyBUZW1wbGF0ZXtcbiAgdGVtcGxhdGU6c3RyaW5nO1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIC8vbm90IGJlaW5nIHVzZWQgcmlnaHQgbm93XG4gIH1cbiAgcG9wdWxhdGUoaWQ6c3RyaW5nLCBuYW1lOnN0cmluZywgc3RhdHVzOnN0cmluZyl7XG4gICAgbGV0IHRhc2s6c3RyaW5nID0gIGA8bGkgaWQ9XCIke2lkfVwiIGRhdGEtc3RhdHVzPVwiJHtzdGF0dXN9XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stbmFtZVwiPiR7bmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWZ1bmN0aW9uPVwiZG9uZVwiPiYjeDI3MTQ7PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWZ1bmN0aW9uPVwiZGVsZXRlXCI+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5gO1xuICAgIHJldHVybiB0YXNrO1xuICB9XG59XG5cbmNsYXNzIExpc3RWaWV3e1xuICBsaXN0OiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IoIGxpc3RpZDogc3RyaW5nICl7XG4gICAgdGhpcy5saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbGlzdCcpO1xuICB9XG4gIGNsZWFyKCl7XG4gICAgdGhpcy5saXN0LmlubmVySFRNTCA9ICcnO1xuICB9XG4gIHJlbmRlciggaXRlbXM6QXJyYXk8VGFzaz4gKXtcbiAgICAvL2NsZWFyIHRoZSB2aWV3XG4gICAgLy9yZW5kZXIgYXJyYXkgdXNpbmcgdGVtcGxhdGVcbiAgICBpdGVtcy5mb3JFYWNoKCAodGFzaykgPT4ge1xuICAgIGxldCBpZD0gdGFzay5pZDtcbiAgICBsZXQgbmFtZSA9IHRhc2submFtZTtcbiAgICBsZXQgc3RhdHVzID0gdGFzay5zdGF0dXMudG9TdHJpbmcoKTtcbiAgICBsZXQgaXRlbSA9IHRhc2t0ZW1wbGF0ZS5wb3B1bGF0ZShpZCxuYW1lLHN0YXR1cyk7XG4gICAgLy8gY29udmVydCBvdXIgc3RyaW5nIHRvIEhUTUwgTm9kZVxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGl0ZW0pO1xuICAgIHRoaXMubGlzdC5hcHBlbmRDaGlsZCggZnJhZ21lbnQgKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLy0tLS1JTklUSUFMSVNFIENMQVNTRVNcbi8vYXJyYXkgdG8gc3RvcmUgdGFza3NcbnZhciB0YXNrYXJyYXk6IEFycmF5PFRhc2s+ID0gW107XG4vL1Rhc2sgTWFuYWdlciBjbGFzcywgcGFzcyB0aGUgdGFzayBhcnJheVxudmFyIHRhc2ttYW5hZ2VyID0gbmV3IFRhc2tNYW5hZ2VyKCB0YXNrYXJyYXkgKTtcbi8vbGlzdCB2aWV3XG52YXIgbGlzdHZpZXcgPSBuZXcgTGlzdFZpZXcoJ3Rhc2stbGlzdCcpO1xuLy90YXNrIHRlbXBsYXRlXG52YXIgdGFza3RlbXBsYXRlID0gbmV3IFRlbXBsYXRlKCk7XG5cblxuXG4vL3JlZmVyZW5jZSB0byBmb3JtXG5jb25zdCB0YXNrZm9ybTpIVE1MRm9ybUVsZW1lbnQgPSAoPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJykpO1xuLy9hZGQgbGlzdGVuZXIgdG8gZm9ybVxudGFza2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCBldmVudDogRXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IGlucHV0OkhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2staW5wdXQnKTtcbiAgbGV0IHRhc2tuYW1lOiBzdHJpbmcgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLnZhbHVlO1xuICBsZXQgdGFzazpUYXNrID0gbmV3IFRhc2sodGFza25hbWUpO1xuICB0YXNrbWFuYWdlci5hZGQoIHRhc2spO1xuICB0YXNrZm9ybS5yZXNldCgpO1xuICBsaXN0dmlldy5jbGVhcigpO1xuICBsaXN0dmlldy5yZW5kZXIoIHRhc2thcnJheSApO1xufSk7XG5cbi8vYWRkIGxpc3RlbmVyIHRvIGxpc3RcbmNvbnN0IGxpc3RlbGVtZW50OkhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbGlzdCcpO1xuLy9hZGQgbGlzdGVuZXIgdG8gbGlzdFxubGlzdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6RXZlbnQpID0+IHtcbiAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgbGV0IHRhcmdldDpIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD4gZXZlbnQudGFyZ2V0O1xuICBpZiggdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1mdW5jdGlvbicpID09ICdkb25lJyApe1xuICAgIGxldCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgdGFza21hbmFnZXIuY2hhbmdlU3RhdHVzKGlkLCgpID0+IHtcbiAgICAgIGxpc3R2aWV3LmNsZWFyKCk7XG4gICAgICBsaXN0dmlldy5yZW5kZXIoIHRhc2thcnJheSApO1xuICAgIH0pO1xuICB9XG5cbn0pO1xuIl19
