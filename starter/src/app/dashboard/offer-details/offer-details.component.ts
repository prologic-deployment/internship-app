<<<<<<< HEAD
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { InternsService } from 'src/app/core/service/interns.service';
import { QuizService } from 'src/app/core/service/quiz.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { environment } from 'src/environments/environment.development';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from 'src/app/core/service/auth.service';
import { ResultsService } from 'src/app/core/service/results.service';
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
  providers : [ToastrService],
  animations: [
    trigger('modernEntrance', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.8) translateY(20px)',
          filter: 'blur(10px)',
        }),
        animate(
          '800ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          style({
            opacity: 1,
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0)',
          })
        )
      ])
    ])
  ]
})
export class OfferDetailsComponent {
  readonly picsUrl = environment.PTE_IMAGES;
  offer!:any
  encadrant!:any
  routeId !: string
  quizzes!:any
  quizzID!:string
  user!:any
  userID!:string
  questionVisibility:boolean=false
  finishQuiz:boolean=false
  questions! : any[]
  users!:any[]
  isLinear = true;
  currentQuestionIndex = 0;
  score = 0;
  userResponses:any[]=[]
  userResults:any[]=[]
  constructor(
    private route:ActivatedRoute,
    private quizService : QuizService,
    private userService:UserServiceService,
    private offerService:InternsService,
    private resultsService:ResultsService,
    private toastr: ToastrService){}
  
    ngOnInit(): void {
      this.userID = localStorage.getItem('userId')!
      this.routeId = this.route.snapshot.paramMap.get('id')!;    
      this.getOfferById()
      this.getquizzsByoffer()

    }

    
    getUserFromPte(id:string){
      this.userService.getUserByIdPTE(id).subscribe(res=>{
        this.encadrant=res
      });
    }
    getOfferById(){
      this.offerService.getOfferById(this.routeId as string).subscribe(res=>{
        this.offer=res.data
        this.getUserFromPte(this.offer.encadrant as string)
      })
    }
    fillQuiz(quizId:string){
      this.questionVisibility=true 
      this.quizzID=quizId
      this.getQuestions()
      this.finishQuiz=false
    }
    getQuestions(){
      this.quizService.getQuizQuestion(this.quizzID).subscribe((res:any)=>{
        this.questions=res.data
      })
    }
    getquizzsByoffer(){
      this.quizService.getOfferQuiz(this.routeId).subscribe(res=>{
        this.quizzes = res.data
        this.resultsService.getResultsByIntern(this.userID).subscribe((res:any)=>{
          this.userResults=res.data
            for(let i=0;i<this.quizzes.length;i++){
              for(let j=0;j<this.userResults.length;j++){
                if(this.userResults[j].userId._id === this.userID){
                  this.quizzes = this.quizzes.filter((x:any)=>x._id !== this.userResults[j].quizId._id)
                }
              }
            }
        })
      })
    }
    nextQuestion(selectedResponse:any) {
      if (this.currentQuestionIndex <= this.questions.length ) {
        if(selectedResponse.isCorrect){
          this.score++
        }
      if(selectedResponse.isCorrect){
        this.userResponses.push({
          questionId : this.questions[this.currentQuestionIndex]._id,
          chosenResponseIds : selectedResponse._id,
          correctAnswer : true,
        },
      )
      }else{
        this.userResponses.push({
          questionId : this.questions[this.currentQuestionIndex]._id,
          chosenResponseIds : selectedResponse._id,
          correctAnswer : false,
        },
      )
      }
        this.currentQuestionIndex++;
      }
      if(this.currentQuestionIndex === this.questions.length){
        this.submitAnswers()
        this.questionVisibility=false
      }
    }
    submitAnswers(){
      let data={
        quizId : this.quizzID,
        userId:this.userID,
        responses :this.userResponses,
        score: this.score
      }
      this.resultsService.saveResults(data).subscribe((res:any)=>{
        this.toastr.success(res.message, 'success')
        this.getquizzsByoffer()
        this.finishQuiz=true
      })
    }
}
=======
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { InternsService } from 'src/app/core/service/interns.service';
import { QuizService } from 'src/app/core/service/quiz.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { environment } from 'src/environments/environment.development';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from 'src/app/core/service/auth.service';
import { ResultsService } from 'src/app/core/service/results.service';
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
  providers : [ToastrService],
  animations: [
    trigger('modernEntrance', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.8) translateY(20px)',
          filter: 'blur(10px)',
        }),
        animate(
          '800ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          style({
            opacity: 1,
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0)',
          })
        )
      ])
    ])
  ]
})
export class OfferDetailsComponent {
  readonly picsUrl = environment.PTE_IMAGES;
  offer!:any
  encadrant!:any
  routeId !: string
  quizzes!:any
  quizzID!:string
  user!:any
  userID!:string
  questionVisibility:boolean=false
  finishQuiz:boolean=false
  questions! : any[]
  users!:any[]
  isLinear = true;
  currentQuestionIndex = 0;
  score = 0;
  userResponses:any[]=[]
  userResults:any[]=[]
  constructor(
    private route:ActivatedRoute,
    private quizService : QuizService,
    private userService:UserServiceService,
    private offerService:InternsService,
    private resultsService:ResultsService,
    private toastr: ToastrService){}
  
    ngOnInit(): void {
      this.userID = localStorage.getItem('userId')!
      this.routeId = this.route.snapshot.paramMap.get('id')!;    
      this.getOfferById()
      this.getquizzsByoffer()

    }

    
    getUserFromPte(id:string){
      this.userService.getUserByIdPTE(id).subscribe(res=>{
        this.encadrant=res
      });
    }
    getOfferById(){
      this.offerService.getOfferById(this.routeId as string).subscribe(res=>{
        this.offer=res.data
        this.getUserFromPte(this.offer.encadrant as string)
      })
    }
    fillQuiz(quizId:string){
      this.questionVisibility=true 
      this.quizzID=quizId
      this.getQuestions()
      this.finishQuiz=false
    }
    getQuestions(){
      this.quizService.getQuizQuestion(this.quizzID).subscribe((res:any)=>{
        this.questions=res.data
      })
    }
    getquizzsByoffer(){
      this.quizService.getOfferQuiz(this.routeId).subscribe(res=>{
        this.quizzes = res.data
        this.resultsService.getResultsByIntern(this.userID).subscribe((res:any)=>{
          this.userResults=res.data
            for(let i=0;i<this.quizzes.length;i++){
              for(let j=0;j<this.userResults.length;j++){
                if(this.userResults[j].userId._id === this.userID){
                  this.quizzes = this.quizzes.filter((x:any)=>x._id !== this.userResults[j].quizId._id)
                }
              }
            }
        })
      })
    }
    nextQuestion(selectedResponse:any) {
      if (this.currentQuestionIndex <= this.questions.length ) {
        if(selectedResponse.isCorrect){
          this.score++
        }
      if(selectedResponse.isCorrect){
        this.userResponses.push({
          questionId : this.questions[this.currentQuestionIndex]._id,
          chosenResponseIds : selectedResponse._id,
          correctAnswer : true,
        },
      )
      }else{
        this.userResponses.push({
          questionId : this.questions[this.currentQuestionIndex]._id,
          chosenResponseIds : selectedResponse._id,
          correctAnswer : false,
        },
      )
      }
        this.currentQuestionIndex++;
      }
      if(this.currentQuestionIndex === this.questions.length){
        this.submitAnswers()
        this.questionVisibility=false
      }
    }
    submitAnswers(){
      let data={
        quizId : this.quizzID,
        userId:this.userID,
        responses :this.userResponses,
        score: this.score
      }
      this.resultsService.saveResults(data).subscribe((res:any)=>{
        this.toastr.success(res.message, 'success')
        this.getquizzsByoffer()
        this.finishQuiz=true
      })
    }
}
>>>>>>> origin/main
