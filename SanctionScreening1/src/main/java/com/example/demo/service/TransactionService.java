package com.example.demo.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.logging.*;
import org.apache.tomcat.util.http.fileupload.FileUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Utility.FileUploadHelper;
import com.example.demo.model.SanctionList;
import com.example.demo.model.ScreenFail;
import com.example.demo.model.Transaction;
import com.example.demo.repository.SanctionListRepository;
import com.example.demo.repository.TransactionRepositoy;
import com.example.demo.repository.ScreenFailRepository;
import com.sun.el.parser.ParseException;
import com.example.demo.Utility.Util;

@Service
public class TransactionService {

	@Autowired
	TransactionRepositoy transactionRepo;

	@Autowired
	SanctionListRepository sanctionRepo;
	
	@Autowired
	ScreenFailRepository screenFailRepo;

	@Autowired
	public FileUploadHelper fileUploadHelper;

	List<Transaction> transactions = new ArrayList<>();
	List<Transaction> validtransactions = new ArrayList<>();
	MultipartFile currentFile;
	

	public void addTransactions() {
//		long millis = System.currentTimeMillis();
//		java.util.Date d = new java.sql.Date(millis);
//		Transaction t1 = new Transaction("1", d, "elena", "123", "damon", "345", 23.5, "valid");
//		Transaction t2 = new Transaction("2", d, "Manasi", "1234", "Bhandari", "6789", 2346, "invalid");
//		Transaction t3 = new Transaction("3", d, "Manasi", "1234", "Noel", "6789", 2346, "valid");
//		transactionRepo.save(t1);
//		transactionRepo.save(t2);
//		transactionRepo.save(t3);
		System.out.println("In addTransactions: "+ transactions);
		for (Iterator<Transaction> t = transactions.iterator(); t.hasNext();) {
			//System.out.println("printing t: "+ (Transaction)t);
			//System.out.println("printing t.next: "+ t.next());
			
			Transaction t1 = t.next();
			System.out.println(t1);
			transactionRepo.save(t1);
			
			System.out.println("Displaying DB rows: " + displayAllTransactionsFromDB());
			//System.out.println(transactionRepo);
		}

	}

	public ResponseEntity<String> FileUpload(MultipartFile file) {
		currentFile = file;
		try {
			if (file.isEmpty()) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("UPLOAD A FILE");
			}
			System.out.println(file.getContentType());
			if (!file.getContentType().equals("text/plain")) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FILE TYPE NOT SUPPORTED");
			}
			boolean uploaded = fileUploadHelper.uploadFile(file);
			
			if (uploaded) {
				int flag = 0;
				String backupid = "000000000001";
				int payerNameSize = 0, payeeNameSize = 0;
				BufferedReader br = null;
				
				try {
					br = new BufferedReader(new FileReader("C:\\Users\\Vibavari\\Desktop\\CitiBridge\\SanctionScreening\\Uploads\\"+file.getOriginalFilename()));
					String st = "";
					
					try {
						try {
							while ((st = br.readLine()) != null) {
								
								flag = 0;
								String ipdate = null;
								DateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
								DateFormat inputFormat = new SimpleDateFormat("ddMMyyyy");
								
								System.out.println(st);   //prints the entire line
								String transactionRef = st.substring(0, 12);
								System.out.println("Id :" + transactionRef);     //prints transaction id

								java.sql.Date valueDate = null;
								
								System.out.println(st.substring(12, 20));
								ipdate = st.substring(12, 20);			//extracts the date in string format
									
								SimpleDateFormat sdf1 = new SimpleDateFormat("ddMMyyyy");
								java.util.Date date = sdf1.parse(ipdate);		//coverts date from String to expanded Date
								System.out.println("coverted from str to date: "+ date);
								
								valueDate = new java.sql.Date(date.getTime());
								System.out.println("after date.getTime :" + valueDate);  //contracted date
								
								int firstIndex = st.indexOf(' '), midIndex;
								midIndex = st.substring(firstIndex + 1).indexOf(' ') + firstIndex + 1;

								String payerName = st.substring(20, firstIndex);			//extracting payer name
								payerNameSize = firstIndex - 20;
								System.out.println("Payer name :" + payerName);		//printing payer name

								String payerAccount = st.substring(firstIndex + 1, firstIndex + 13);
								System.out.println("Payer acc :" + payerAccount);    //printing payer account

								String payeeName = st.substring(firstIndex + 13, midIndex);
								payeeNameSize = midIndex - (firstIndex + 13);			//calc payee name size
								System.out.println("Payee name :" + payeeName);			//printing payee name

								String payeeAccount = st.substring(midIndex + 1, midIndex + 13);
								System.out.println("Payee acc :" + payeeAccount);		//printing payee account

								double amount = Double.parseDouble(st.substring(midIndex + 13));
								System.out.println("amount :" + amount);			//printing amount

								if (Util.uniqueReferenceId(transactions, transactionRef)) {
									String s1 = dateFormat.format(valueDate);
									System.out.println("Formatted valueDate=" + s1);  //date to string again - original state
									System.out.println("Hrllo");
									System.out.println(transactions);			//print existing database values
									
									if (Util.presentDate(s1)) {
										System.out.println("Date :" + valueDate);
										if (Util.alphaNumeric(payerName) && payerNameSize <= 35 && Util.alphaNumeric(payeeName)
												&& payeeNameSize <= 35 && Util.alphaNumeric(payeeAccount)
												&& Util.alphaNumeric(payeeAccount)) {
											
											if (Util.validAmount(amount)) {
												
												transactions.add(new Transaction(transactionRef, valueDate, payerName,
														payerAccount, payeeName, payeeAccount, amount, "Valid Pass"));
												
												flag = 1;
												
											} 
											else {
												
												System.out.println("No amount");
											}
										} 
										else {
											
											System.out.println("No name or account");
										}
									} 
									else {
										
										System.out.println("Datesss :" + valueDate);
										System.out.println("No date");
										System.out.println("Flag value: "+flag);
									}
									
								} 
								else {
									//if reference id is not unique
									System.out.println("No id");
									transactionRef = backupid;
									long l=Long.parseLong(backupid);  
									l++;
									backupid=Long.toString(l);
								}

								if (flag == 0) {
									System.out.println("Flag value is 0");
									transactions.add(new Transaction(transactionRef, valueDate, payerName, payerAccount,
											payeeName, payeeAccount, amount, "Valid Fail"));			//if all validation conditions did not pass
									System.out.println(transactions);
								}
								
								flag = 0;
								
								addTransactions();
							}
						} catch (IOException e) {
							e.printStackTrace();
						} 
						catch (StringIndexOutOfBoundsException e) {	
							System.out.println("Exception occurred . . . . . . . . ");
						}
					} catch (NumberFormatException e) {
						e.printStackTrace();
					}
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				}
				return ResponseEntity.ok("FILE SUCCESSFULLY UPLOADED!");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR. TRY AGAIN.");
	}

	public List<Transaction> displayAllTransactionsFromDB() {
		return transactionRepo.findAll();
	}
	
	public List<ScreenFail> displayShadyTransactionsFromDB() {
		return screenFailRepo.findAll();
	}

	public List<Transaction> displayStatus(String status) {
		return transactionRepo.displayStatus(status);
	}

	public List<Transaction> screening() {
		List<Transaction> transactions = new ArrayList<Transaction>();

		for (Transaction t : transactionRepo.findAll()) {
			String payer = t.getPayerName();
			String payee = t.getPayeeName();
			for (SanctionList s : sanctionRepo.findAll()) {
				if (payee.equalsIgnoreCase(s.getName()) || payer.equalsIgnoreCase(s.getName())) {
					transactions.add(saveWithStatus(t, "Screen Fail"));
				
					ScreenFail sf = new ScreenFail();
					sf.setTransactionRef(t.getTransactionRef());
					sf.setValueDate(t.getValueDate());
					sf.setPayerName(t.getPayerName());
					sf.setPayerAccount(t.getPayerAccount());
					sf.setPayeeName(t.getPayeeName());
					sf.setPayeeAccount(t.getPayeeAccount());
					sf.setAmount(t.getAmount());
					sf.setStatus("Screen Fail");

					screenFailRepo.save(sf);
					
				} else {
					if (t.getStatus().equalsIgnoreCase("Valid Pass")) {
						saveWithStatus(t, "Screen Pass");
					}
				}
			}
		}
		Move(currentFile);
		return transactions;
	}
	
	public static void Move(MultipartFile multipart) {
		File fileSrc = new File(multipart.getOriginalFilename());
		FileOutputStream fos;
		try {
			fos = new FileOutputStream(fileSrc);
			fos.write(multipart.getBytes());
			fos.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		File newFileDest = new File("C:\\Users\\Vibavari\\Desktop\\CitiBridge\\SanctionScreening\\Archives\\" + fileSrc.getName());
		if (fileSrc.exists()) {
			if (newFileDest.exists()) {
				if (fileSrc.renameTo(newFileDest)) {
					System.out.println("Move operation is successful");
				} else {
					System.out.println("Move operation is unsuccessful");
				}
			} else {
				File destinationFolder = new File("C:\\Users\\Vibavari\\Desktop\\CitiBridge\\SanctionScreening\\Archives\\");
				destinationFolder.mkdirs();
				if (fileSrc.renameTo(newFileDest)) {
					System.out.println("Move operation is successful2");
				} else {
					System.out.println("Move operation is unsuccessful2");
				}
			}
		} else {
			System.out.println("Src file does not exits");
		}
		
		
		String path = multipart.getOriginalFilename();
		System.out.println(path);
		File myObj = new File("C:\\Users\\Vibavari\\Desktop\\CitiBridge\\SanctionScreening\\"+path);
		if (myObj.delete()) { 
		    System.out.println("Deleted the file: " + myObj.getName());
		} 
		else {
		    System.out.println("Failed to delete the file.");
		}
		
		
		
	}
	
	public static File convertMultiPartToFile(MultipartFile file) throws IOException {
	    File convFile = new File(file.getOriginalFilename());
	    FileOutputStream fos = new FileOutputStream(convFile);
	    fos.write(file.getBytes());
	    fos.close();
	    return convFile;
	}
	
	public Transaction saveWithStatus(Transaction t, String status) {
		Transaction temp = transactionRepo.getOne(t.getTransactionRef());
		temp.setTransactionRef(t.getTransactionRef());
		temp.setValueDate(t.getValueDate());
		temp.setPayerName(t.getPayerName());
		temp.setPayerAccount(t.getPayerAccount());
		temp.setPayeeName(t.getPayeeName());
		temp.setPayeeAccount(t.getPayeeAccount());
		temp.setAmount(t.getAmount());
		temp.setStatus(status);

		transactionRepo.save(temp);
		return temp;
	}
	
	public void exit() {
		transactions.clear();
		transactionRepo.deleteAll();
	}

}
