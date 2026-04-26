from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import ast
import contextlib
import io
import time
import os
from typing import Optional

app = FastAPI(title="QuantumVerse Execution Engine")

# Pre-defined allowed modules. We also use AST-based import blocking.
ALLOWED_IMPORTS = {"math", "numpy", "cmath", "random", "qiskit", "qiskit_aer", "cirq", "json"}
BLOCKED_MODULES = {"os", "sys", "subprocess", "socket", "shutil", "pathlib", "importlib"}

class ExecuteRequest(BaseModel):
    code: str
    language: str

class ExecuteResponse(BaseModel):
    output: str
    error: Optional[str] = None
    execution_time: float

def check_security(code_str: str) -> bool:
    try:
        tree = ast.parse(code_str)
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    base_module = alias.name.split('.')[0]
                    if base_module in BLOCKED_MODULES or base_module not in ALLOWED_IMPORTS:
                        return False
            elif isinstance(node, ast.ImportFrom):
                if getattr(node, 'module', None):
                    base_module = node.module.split('.')[0]
                    if base_module in BLOCKED_MODULES or base_module not in ALLOWED_IMPORTS:
                        return False
            # Prevent common dangerous builtins
            elif isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name):
                    if node.func.id in {"eval", "exec", "open", "__import__"}:
                        return False
        return True
    except SyntaxError:
        return False # Invalid syntax is caught later

@app.post("/execute", response_model=ExecuteResponse)
async def execute_code(req: ExecuteRequest):
    # Optional: Basic auth check if deployed
    # token = request.headers.get("Authorization")
    
    if req.language.lower() != "python":
        raise HTTPException(status_code=400, detail="Only Python execution is supported.")
        
    if not check_security(req.code):
        return ExecuteResponse(
            output="",
            error="Security Error: Code contains unauthorized imports or function calls.",
            execution_time=0.0
        )
        
    stdout = io.StringIO()
    stderr = io.StringIO()
    start_time = time.time()
    
    try:
        # The AST parser ensures no malicious imports are present in the code.
        # Execute the code in an empty globals dict to prevent access to the enclosing scope,
        # while retaining standard __builtins__ for normal Python execution (imports, etc).
        with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
            exec(req.code, {})
    except Exception as e:
        stderr.write(str(e))
        
    exec_time = time.time() - start_time
    
    return ExecuteResponse(
        output=stdout.getvalue(),
        error=stderr.getvalue() if stderr.getvalue() else None,
        execution_time=round(exec_time, 4)
    )

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "QuantumVerse Engine"}
