// hello.cc
#include <node.h>

namespace demo
{

    using v8::Array;
    using v8::Context;
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::FunctionTemplate;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::ObjectTemplate;
    using v8::String;
    using v8::Value;

    // void Method(const FunctionCallbackInfo<Value> &args)
    // {
    //     Isolate *isolate = args.GetIsolate();
    //     Local<Context> context = isolate->GetCurrentContext();

    //     int next, first = 0, second = 0, c = 0, n = args[0]->NumberValue(context);
    //     Local<Array> arr = Array::New(isolate, n);

    //     int i = 0;
    //     for (; c < n; c++)
    //     {
    //         if (c <= 1)
    //             next = c;
    //         else
    //         {
    //             next = first + second;
    //             first = second;
    //             second = next;
    //         }

    //         //arr->Set(i++, Number::New(isolate, next));
    //         arr -> New(isolate, n);
    //         arr
    //     }

    //     args.GetReturnValue().Set(arr);
    // }

    void Method(const FunctionCallbackInfo<Value> &args)
    {
        Isolate *isolate = args.GetIsolate();
        Local<Context> context = isolate->GetCurrentContext();
        // String Declare Type
        Local<String> str = v8::String::NewFromUtf8(isolate, "Hello World!");

        // Object Declare Type
        Local<Object> obj = v8::Object::New(isolate);

        // Array Declare Type
        Local<Array> arr = Array::New(isolate);
        // Array Assignment
        arr->Set(context, 0, Number::New(isolate, 1));
        arr->Set(context, 1, Number::New(isolate, 10));
        //arr->Set(context, 1, );
        //obj->Set(context, String::NewFromUtf8(isolate, "arg5"), arr);

        args.GetReturnValue().Set(arr);
    }

    void Initialize(Local<Object> exports)
    {
        NODE_SET_METHOD(exports, "binding", Method);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

} // namespace demo